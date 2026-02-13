import OpenAI from 'openai'

import { env } from '~/env'

import type { ModelsIds } from '~/types/models'

// OpenRouter client (for free models only)
const createOpenRouterClient = (): OpenAI => {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': env.OPENROUTER_SITE_URL,
      'X-Title': env.OPENROUTER_SITE_NAME,
    },
  })
}

// Native OpenAI client (for BYOK)
const createNativeOpenAIClient = (apiKey: string): OpenAI => {
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.openai.com/v1',
  })
}

// Anthropic native call (BYOK)
async function createAnthropicChatCompletion(
  messages: ChatMessage[],
  modelId: ModelsIds,
  apiKey: string,
  stream = false
) {
  const url = 'https://api.anthropic.com/v1/messages'
  const modelName = modelId.replace(/^anthropic\//, '').replace(/:byok$/, '')

  // Correctly separate the system prompt from the conversational history
  const systemPrompt = messages.find((m) => m.role === 'system')?.content
  const conversationMessages = messages.filter((m) => m.role !== 'system')

  const body = {
    model: modelName,
    max_tokens: 1024,
    system: systemPrompt, // Use the dedicated 'system' parameter
    messages: conversationMessages, // Pass the full alternating user/assistant history
    stream,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`❌ Anthropic API error: ${await res.text()}`)
  if (stream) {
    return { success: true, stream: res.body }
  }
  const data = await res.json()
  // The response structure for Claude is {..., "content": [{"type": "text", "text": "..."}]}
  return { success: true, message: data.content?.[0]?.text || '' }
}

const parseGeminiRetryDelay = (rawDelay?: string): string | null => {
  if (!rawDelay) return null
  const trimmed = rawDelay.trim()
  return trimmed.length > 0 ? trimmed : null
}

const getGeminiRetryDelayFromBody = (errorBody: any): string | null => {
  const retryDetail = errorBody?.error?.details?.find(
    (detail: any) => detail?.['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
  )
  return parseGeminiRetryDelay(retryDetail?.retryDelay)
}

const getGeminiRetryDelayFromText = (errorText: string): string | null => {
  const retryDelayMatch = errorText.match(/"retryDelay"\s*:\s*"([^"]+)"/i)
  if (retryDelayMatch?.[1]) return parseGeminiRetryDelay(retryDelayMatch[1])
  const retrySecondsMatch = errorText.match(/retry in\s+([0-9.]+)\s*s/i)
  if (retrySecondsMatch?.[1]) return parseGeminiRetryDelay(`${retrySecondsMatch[1]}s`)
  return null
}

const parseGeminiErrorBody = (errorText: string): any | null => {
  try {
    return JSON.parse(errorText)
  } catch {
    // Some Gemini errors come back as text/event-stream or wrapped strings.
  }
  const jsonMatch = errorText.match(/\{[\s\S]*\}/)
  if (!jsonMatch?.[0]) return null
  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    return null
  }
}

const isGeminiRateLimitError = (errorBody: any, errorText: string): boolean => {
  const errorCode = errorBody?.error?.code
  const errorStatus = errorBody?.error?.status
  return (
    errorCode === 429 ||
    errorStatus === 'RESOURCE_EXHAUSTED' ||
    /RESOURCE_EXHAUSTED/i.test(errorText) ||
    /quota exceeded/i.test(errorText) ||
    /rate limit/i.test(errorText) ||
    /429/.test(errorText)
  )
}

const getGeminiRateLimitMessage = (modelName: string, retryDelay?: string | null): string => {
  const retryText = retryDelay ? ` Retry in ${retryDelay}.` : ''
  return `❌ Gemini rate limit exceeded for ${modelName}.${retryText} Check your Gemini API quota and billing.`
}

// Gemini native call (BYOK)
async function createGeminiChatCompletion(messages: ChatMessage[], modelId: ModelsIds, apiKey: string, stream = false) {
  const modelName = modelId.replace(/^google\//, '').replace(/:byok$/, '')
  const endpoint = stream ? 'streamGenerateContent' : 'generateContent'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:${endpoint}?key=${apiKey}${
    stream ? '&alt=sse' : ''
  }`

  // Note: Gemini has strict rules about roles. A system prompt is best handled by
  // prepending its content to the first user message for robust conversation flow.
  const systemPrompt = messages.find((m) => m.role === 'system')?.content
  const conversationMessages = messages.filter((m) => m.role !== 'system')

  if (systemPrompt && conversationMessages.length === 0) {
    // Handle edge case: if there are no conversation messages, create one from the system prompt
    conversationMessages.push({ role: 'user', content: systemPrompt })
  } else if (
    systemPrompt &&
    conversationMessages.length > 0 &&
    conversationMessages[0]?.role === 'user' &&
    typeof conversationMessages[0]?.content === 'string'
  ) {
    // Prepend system prompt to first user message
    conversationMessages[0].content = `${systemPrompt}\n\n${conversationMessages[0].content}`
  } else if (systemPrompt && conversationMessages.length > 0) {
    // System prompt exists but first message isn't a user message - prepend as user message
    conversationMessages.unshift({ role: 'user', content: systemPrompt })
  }

  // Transform roles for Gemini API: 'assistant' must become 'model'
  const contents = conversationMessages.map((m: ChatMessage) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const body = { contents: contents }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorText = await res.text()
    const errorBody = parseGeminiErrorBody(errorText)
    if (isGeminiRateLimitError(errorBody, errorText)) {
      const retryDelay = getGeminiRetryDelayFromBody(errorBody) ?? getGeminiRetryDelayFromText(errorText)
      throw new Error(getGeminiRateLimitMessage(modelName, retryDelay))
    }
    throw new Error(`❌ Gemini API error: ${errorText}`)
  }
  if (stream) {
    return { success: true, stream: res.body }
  }
  const data = await res.json()
  // The response structure can have safety blocks, so check for candidates first.
  return { success: true, message: data.candidates?.[0]?.content?.parts?.[0]?.text || '' }
}

// Grok native call (BYOK)
async function createGrokChatCompletion(messages: ChatMessage[], modelId: ModelsIds, apiKey: string, stream = false) {
  const url = 'https://api.x.ai/v1/chat/completions'
  const modelName = modelId.replace(/^grok\//, '').replace(/:byok$/, '')

  const body = {
    model: modelName,
    messages,
    temperature: 0.7,
    max_tokens: 1000,
    stream,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`❌ Grok API error: ${await res.text()}`)
  if (stream) {
    return { success: true, stream: res.body }
  }
  const data = await res.json()
  return { success: true, message: data.choices?.[0]?.message?.content || '' }
}

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const isFailoverError = (error: any): boolean => {
  // Since the API always returns 500 regardless of the actual error,
  // we'll treat any API error as a potential rate limit or server issue
  return (
    error?.status === 500 ||
    error?.status === 502 ||
    error?.status === 503 ||
    error?.status === 504 ||
    error?.status === 429 ||
    error?.message?.includes('500') ||
    error?.message?.includes('429') ||
    error?.message?.includes('rate limit') ||
    error?.message?.includes('quota') ||
    error?.message?.includes('limit exceeded') ||
    error?.message?.includes('server error') ||
    error?.message?.includes('API') // Catch generic API errors
  )
}

const makeApiCallWithFallback = async <T>(
  apiCall: (client: OpenAI) => Promise<T>,
  maxRetries = 5 // Maximum number of retries for API calls
): Promise<{ success: true; data: T } | { success: false; error: string }> => {
  let lastError: any = null
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      const client = createOpenRouterClient()
      const result = await apiCall(client)
      return { success: true, data: result }
    } catch (error) {
      lastError = error
      attempts++

      console.error(`❌ OpenRouter API error (attempt ${attempts}/${maxRetries}): `, error)

      // Check for 404 errors (model not found) - don't retry these
      const err = error as any
      if (err?.status === 404 || err?.code === 404 || err?.message?.includes('404')) {
        // Extract model name from error message (pattern: provider/model-name:variant)
        // Example: "404 No endpoints found for google/gemini-2.0-flash-001:free."
        const modelMatch = err?.message?.match(/([a-z0-9-]+\/[a-z0-9.-]+(?::[a-z]+)?)/i)
        const modelName = modelMatch ? modelMatch[1] : 'the requested model'
        return {
          success: false,
          error: `Model "${modelName}" is not available on OpenRouter. It may have been deprecated or removed. Please try a different model.`,
        }
      }

      // If it's not a failover error, don't retry
      if (!isFailoverError(error)) {
        break
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Unknown error occurred after all retries.',
  }
}

export const createChatCompletion = async (messages: ChatMessage[], modelId: ModelsIds, apiKey?: string) => {
  // Route based on model
  if (modelId.endsWith(':free')) {
    // OpenRouter (free)
    const result = await makeApiCallWithFallback((client) =>
      client.chat.completions.create({
        model: modelId ?? (env.VITE_OPENROUTER_DEFAULT_MODEL as ModelsIds),
        messages,
        temperature: 0.7,
        max_completion_tokens: 1000,
      })
    )
    if (!result.success) {
      return { success: false, error: result.error }
    }
    return {
      success: true,
      message: result.data.choices[0]?.message?.content || '',
      usage: result.data.usage,
    }
  }

  if (modelId.startsWith('openai/')) {
    // BYOK OpenAI
    if (!apiKey) return { success: false, error: '❌ No OpenAI API key set.' }
    const client = createNativeOpenAIClient(apiKey)
    try {
      const result = await client.chat.completions.create({
        model: modelId.replace(/^openai\//, '').replace(/:byok$/, ''),
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      })
      return {
        success: true,
        message: result.choices[0]?.message?.content || '',
        usage: result.usage,
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  if (modelId.startsWith('anthropic/')) {
    // BYOK Anthropic
    if (!apiKey) return { success: false, error: '❌ No Anthropic API key set.' }
    try {
      return await createAnthropicChatCompletion(messages, modelId, apiKey, false)
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  if (modelId.startsWith('google/')) {
    // BYOK Gemini
    if (!apiKey) return { success: false, error: '❌ No Gemini API key set.' }
    try {
      return await createGeminiChatCompletion(messages, modelId, apiKey, false)
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  if (modelId.startsWith('grok/')) {
    if (!apiKey) return { success: false, error: '❌ No Grok API key set.' }
    try {
      return await createGrokChatCompletion(messages, modelId, apiKey, false)
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return { success: false, error: 'Unknown model provider.' }
}

export const createChatCompletionStream = async (messages: ChatMessage[], modelId: ModelsIds, apiKey?: string) => {
  if (modelId.endsWith(':free')) {
    const result = await makeApiCallWithFallback((client) =>
      client.chat.completions.create({
        model: modelId ?? (env.VITE_OPENROUTER_DEFAULT_MODEL as ModelsIds),
        messages,
        temperature: 0.7,
        max_completion_tokens: 1000,
        stream: true,
      })
    )
    if (!result.success) {
      return { success: false, error: result.error, stream: null }
    }
    return { success: true, stream: result.data }
  }

  if (modelId.startsWith('openai/')) {
    if (!apiKey) return { success: false, error: '❌ No OpenAI API key set.', stream: null }

    const client = createNativeOpenAIClient(apiKey)

    try {
      const stream = await client.chat.completions.create({
        model: modelId.replace(/^openai\//, '').replace(/:byok$/, ''),
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      })
      return { success: true, stream }
    } catch (error: any) {
      return { success: false, error: error.message, stream: null }
    }
  }

  if (modelId.startsWith('anthropic/')) {
    if (!apiKey) return { success: false, error: '❌ No Anthropic API key set.', stream: null }

    try {
      const result = await createAnthropicChatCompletion(messages, modelId, apiKey, true)
      return { success: true, stream: result.stream }
    } catch (error: any) {
      return { success: false, error: error.message, stream: null }
    }
  }

  if (modelId.startsWith('google/')) {
    if (!apiKey) return { success: false, error: '❌ No Gemini API key set.', stream: null }

    try {
      const result = await createGeminiChatCompletion(messages, modelId, apiKey, true)
      return { success: true, stream: result.stream }
    } catch (error: any) {
      return { success: false, error: error.message, stream: null }
    }
  }

  if (modelId.startsWith('grok/')) {
    if (!apiKey) return { success: false, error: '❌ No Grok API key set.', stream: null }

    try {
      const result = await createGrokChatCompletion(messages, modelId, apiKey, true)
      return { success: true, stream: result.stream }
    } catch (error: any) {
      return { success: false, error: error.message, stream: null }
    }
  }

  return { success: false, error: 'Unknown model provider.', stream: null }
}
