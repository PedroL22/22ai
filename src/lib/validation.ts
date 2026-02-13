import { z } from 'zod'

import { MAX_CHAT_ID_LENGTH, MAX_MESSAGE_LENGTH, MAX_TITLE_LENGTH } from './constants'

export const chatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().trim().max(MAX_MESSAGE_LENGTH, `Message content exceeds ${MAX_MESSAGE_LENGTH} characters`),
})

export const chatIdSchema = z.string().trim().max(MAX_CHAT_ID_LENGTH, 'Invalid chat ID')
export const titleSchema = z.string().trim().max(MAX_TITLE_LENGTH, `Title exceeds ${MAX_TITLE_LENGTH} characters`)

export class UnauthorizedError extends Error {
  constructor(message = 'You do not have permission to access this resource') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const verifyChatOwnership = async (
  db: any,
  chatId: string,
  userId: string
): Promise<{
  id: string
  userId: string
  title: string | null
  isPinned: boolean
  isShared: boolean
  createdAt: Date
  updatedAt: Date
} | null> => {
  const chat = await db.chat.findUnique({ where: { id: chatId } })
  if (!chat) return null
  if (chat.userId !== userId) return null
  return chat
}
