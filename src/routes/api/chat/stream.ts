import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { env } from '~/env'
import { MAX_API_KEY_LENGTH, MAX_MESSAGES_COUNT } from '~/lib/constants'
import { createGeminiBYOKStreamParser } from '~/lib/gemini-byok-parser'
import { createChatCompletionStream } from '~/lib/openai'
import { chatMessageSchema } from '~/lib/validation'
import { tryCatch } from '~/utils/try-catch'

import type { ModelsIds } from '~/types/models'
import { MODELS } from '~/types/models'

const MODEL_IDS = MODELS.map((model) => model.id) as [ModelsIds, ...ModelsIds[]]

const streamRequestSchema = z.object({
  messages: z.array(chatMessageSchema).max(MAX_MESSAGES_COUNT, `Messages array exceeds ${MAX_MESSAGES_COUNT} items`),
  modelId: z
    .enum(MODEL_IDS)
    .optional()
    .default(env.VITE_OPENROUTER_DEFAULT_MODEL as ModelsIds),
  apiKey: z.string().trim().max(MAX_API_KEY_LENGTH).optional(),
  reasoningLevel: z.enum(['low', 'medium', 'high']).optional(),
})

const isReasoningModel = (modelId: ModelsIds): boolean => {
  const model = MODELS.find((m) => m.id === modelId)
  return model?.supportsReasoning ?? false
}

type StreamEventType = 'chunk' | 'thinking' | 'done' | 'error'

type StreamEvent = {
  type: StreamEventType
  content?: string
  reasoning?: string
  done: boolean
}

const parseDeepSeekReasoning = (chunk: any): { content: string; reasoning: string } => {
  const delta = chunk.choices?.[0]?.delta
  const reasoningContent = delta?.reasoning_content || delta?.reasoning || ''
  const content = delta?.content || ''
  return { content, reasoning: reasoningContent }
}

const parseAnthropicStreamEvent = (lines: string[]): StreamEvent[] => {
  const events: StreamEvent[] = []

  for (const line of lines) {
    if (!line.startsWith('data: ')) continue

    try {
      const data = JSON.parse(line.slice(6))

      if (data.type === 'content_block_delta') {
        const delta = data.delta
        if (delta.type === 'thinking_delta') {
          events.push({
            type: 'thinking',
            reasoning: delta.thinking || '',
            done: false,
          })
        } else if (delta.type === 'text_delta') {
          events.push({
            type: 'chunk',
            content: delta.text || '',
            done: false,
          })
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  return events
}

export const Route = createFileRoute('/api/chat/stream')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          const { messages, modelId, apiKey, reasoningLevel } = streamRequestSchema.parse(body)

          const { data, error } = await tryCatch(createChatCompletionStream(messages, modelId, apiKey, reasoningLevel))

          if (error) {
            console.error('❌ Error creating chat completion stream: ', error)
            return new Response(JSON.stringify({ error: 'Failed to create streaming response' }), { status: 500 })
          }

          if (!data.stream) {
            console.error('❌ No stream data available: ', data.error)
            const isModelNotFound = data.error?.includes('not available') || data.error?.includes('404')
            return new Response(JSON.stringify({ error: data.error ?? 'No stream data available' }), {
              status: isModelNotFound ? 400 : 500,
            })
          }

          const encoder = new TextEncoder()
          const hasReasoning = isReasoningModel(modelId)
          const isGeminiBYOK = modelId.startsWith('google/') && modelId.endsWith(':byok')
          const isAnthropicBYOK = modelId.startsWith('anthropic/') && modelId.endsWith(':byok')
          const isDeepSeek = modelId.startsWith('deepseek/')

          const stream = new ReadableStream({
            async start(controller) {
              try {
                const streamAsyncIterable = data.stream! as AsyncIterable<any>

                for await (const chunk of streamAsyncIterable) {
                  if (isGeminiBYOK) {
                    const content = createGeminiBYOKStreamParser()(chunk)
                    if (content) {
                      const sseData = JSON.stringify({
                        type: 'chunk',
                        content,
                        done: false,
                      } as StreamEvent)
                      controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                    }
                  } else if (isAnthropicBYOK && hasReasoning) {
                    const chunkText = new TextDecoder().decode(chunk as Uint8Array)
                    const lines = chunkText.split('\n')
                    const events = parseAnthropicStreamEvent(lines)

                    for (const event of events) {
                      const sseData = JSON.stringify(event)
                      controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                    }
                  } else if (isDeepSeek && hasReasoning) {
                    const { content, reasoning } = parseDeepSeekReasoning(chunk)

                    if (reasoning) {
                      const sseData = JSON.stringify({
                        type: 'thinking',
                        reasoning,
                        done: false,
                      } as StreamEvent)
                      controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                    }

                    if (content) {
                      const sseData = JSON.stringify({
                        type: 'chunk',
                        content,
                        done: false,
                      } as StreamEvent)
                      controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                    }
                  } else {
                    const content = chunk.choices?.[0]?.delta?.content || ''

                    if (content) {
                      const sseData = JSON.stringify({
                        type: 'chunk',
                        content,
                        done: false,
                      } as StreamEvent)
                      controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                    }
                  }
                }

                const finalData = JSON.stringify({
                  type: 'done',
                  done: true,
                } as StreamEvent)

                controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
                controller.close()
              } catch (streamError) {
                console.error('❌ Error processing stream: ', streamError)

                const errorData = JSON.stringify({
                  type: 'error',
                  error: 'Error processing streaming response',
                  done: true,
                } as StreamEvent)

                controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
                controller.close()
              }
            },
          })

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              Connection: 'keep-alive',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          })
        } catch (parseError) {
          console.error('❌ Error parsing request: ', parseError)
          return new Response(JSON.stringify({ error: 'Invalid request format' }), { status: 400 })
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        })
      },
    },
  },
})
