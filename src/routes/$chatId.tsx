import { createFileRoute } from '@tanstack/react-router'
import { ChatArea } from '~/components/ChatArea'

export const Route = createFileRoute('/$chatId')({
  component: ChatPage,
})

function ChatPage() {
  const { chatId } = Route.useParams()
  return <ChatArea chatId={chatId} />
}
