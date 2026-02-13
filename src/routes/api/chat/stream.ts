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
})

export const Route = createFileRoute('/api/chat/stream')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          const { messages, modelId, apiKey } = streamRequestSchema.parse(body)

          const { data, error } = await tryCatch(createChatCompletionStream(messages, modelId, apiKey))

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
          const stream = new ReadableStream({
            async start(controller) {
              try {
                let fullMessage = ''
                const isGeminiBYOK = modelId.startsWith('google/') && modelId.endsWith(':byok')

                const streamAsyncIterable = data.stream! as AsyncIterable<any>
                for await (const chunk of streamAsyncIterable) {
                  const content = isGeminiBYOK
                    ? createGeminiBYOKStreamParser()(chunk)
                    : chunk.choices[0]?.delta?.content || ''

                  if (content) {
                    fullMessage += content

                    const sseData = JSON.stringify({
                      type: 'chunk',
                      content,
                      fullMessage,
                      done: false,
                    })

                    controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
                  }
                }

                const finalData = JSON.stringify({
                  type: 'done',
                  content: '',
                  fullMessage: fullMessage.trim().replace(/"/g, ''),
                  done: true,
                })

                controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
                controller.close()
              } catch (streamError) {
                console.error('❌ Error processing stream: ', streamError)

                const errorData = JSON.stringify({
                  type: 'error',
                  error: 'Error processing streaming response',
                  done: true,
                })

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
