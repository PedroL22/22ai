import { createFileRoute } from '@tanstack/react-router'
import { ChatArea } from '~/components/ChatArea'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return <ChatArea />
}
