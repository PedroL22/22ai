import { useMatches, useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { ChatSearchCommand } from './ChatSearchCommand'
import { Sidebar } from './Sidebar'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const matches = useMatches()
  const pathname = useLocation({ select: (location) => location.pathname })
  const chatMatch = matches.find((m) => 'chatId' in (m.params as Record<string, string>))
  const chatId = (chatMatch?.params as Record<string, string> | undefined)?.chatId

  const routesToHide = ['/sign-in', '/settings']
  const showSidebarAndSearchCommand = !routesToHide.some((route) => pathname.startsWith(route))

  if (!showSidebarAndSearchCommand) {
    return children
  }

  return (
    <div className='flex h-svh w-screen items-center justify-center overflow-hidden 2xl:py-5'>
      <div className='flex size-full max-w-[1500px] bg-accent 2xl:overflow-hidden 2xl:rounded-lg 2xl:shadow-sm dark:bg-accent'>
        <Sidebar selectedChatId={chatId} />
        <ChatSearchCommand />
        {children}
      </div>
    </div>
  )
}
