'use client'

import { UserProfile, useClerk, useUser } from '@clerk/nextjs'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ChevronDown, Github, Loader2, LogIn, LogOut, Moon, PanelLeft, Pin, Settings, Sun, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { ChatMenu } from './ChatMenu'

import { useChatStore } from '~/stores/useChatStore'
import { useSidebarStore } from '~/stores/useSidebarStore'

import { clerkThemes } from '~/lib/clerk-themes'
import { getGroupLabel, groupChats } from '~/utils/group-chats'
import { isMobile } from '~/utils/is-mobile'

type SidebarProps = {
  selectedChatId?: string | null | undefined
}

/**
 * Sidebar component that displays the chat list and user information.
 */
export const Sidebar = ({ selectedChatId }: SidebarProps) => {
  const { isOpen, setIsOpen } = useSidebarStore()
  const { chats: localChats, clearChats, chatsDisplayMode, isSyncing, isInitialLoading } = useChatStore()
  const { isSignedIn, isLoaded, user } = useUser()
  const { signOut } = useClerk()
  const [manageAccountDialogOpen, setManageAccountDialogOpen] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const chatsToDisplay = (() => {
    if (!isSignedIn) {
      return localChats.map((chat) => ({ ...chat, isLocal: true }))
    }

    if (chatsDisplayMode === 'synced') {
      // Signed in and synced - show all chats from store (which contains synced data)
      return localChats.map((chat) => ({ ...chat, isLocal: false }))
    }

    // Fallback to local chats during sync
    return localChats.map((chat) => ({ ...chat, isLocal: true }))
  })()

  const sortedChats = chatsToDisplay.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime()
    const dateB = new Date(b.updatedAt).getTime()
    return dateB - dateA
  })

  const groupedChats = groupChats(sortedChats)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { push } = useRouter()

  // Always close sidebar on mobile when the component mounts
  // This ensures the sidebar is closed when navigating to a new page on mobile
  useEffect(() => {
    // Check mobile state inside useEffect to avoid hydration issues
    const checkMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
    if (checkMobile()) {
      setIsOpen(false)
    }
  }, []) // Remove setIsOpen from dependencies

  // Handle Ctrl+B and Ctrl+Shift+O
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const isCtrlB = (isMac ? e.metaKey : e.ctrlKey) && (e.key === 'b' || e.key === 'B')
      const isCtrlShiftO = (isMac ? e.metaKey : e.ctrlKey) && e.shiftKey && (e.key === 'o' || e.key === 'O')

      if (isCtrlB) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }

      if (isCtrlShiftO) {
        e.preventDefault()
        // Navigate to home page for new chat
        push('/')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  // Handle scroll detection for gradient indicator
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const checkScrollability = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const canScroll = scrollHeight > clientHeight
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px threshold
      setCanScrollDown(canScroll && !isAtBottom)
    }

    checkScrollability()
    scrollContainer.addEventListener('scroll', checkScrollability)

    // Check on content changes
    const resizeObserver = new ResizeObserver(checkScrollability)
    resizeObserver.observe(scrollContainer)

    return () => {
      scrollContainer.removeEventListener('scroll', checkScrollability)
      resizeObserver.disconnect()
    }
  }, [sortedChats, isOpen])

  const handleLogout = async () => {
    clearChats()
    await signOut()
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleNewChatClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <aside className='relative'>
      {/* Floating toggle button */}
      <div className='absolute top-4 left-2.5 z-50 md:left-3.5'>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Open sidebar'
          onClick={toggleSidebar}
          data-state={isOpen ? 'open' : 'closed'}
          className='backdrop-blur-sm data-[state=closed]:bg-white/10 md:data-[state=closed]:bg-transparent'
        >
          <PanelLeft className='size-5' />
        </Button>
      </div>

      {/* Sidebar is open based on isOpen state */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { width: '24rem' },
          closed: { width: 0 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className='flex h-full shrink-0 select-none flex-row overflow-hidden bg-background text-background-foreground'
      >
        {/* Left vertical button panel */}
        <div className='flex w-16 shrink-0 flex-col items-center justify-between bg-background p-2 py-4'>
          {/* Theme switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Change theme'
                className='mt-13 md:mt-11 dark:text-accent-foreground'
              >
                <Sun className='dark:-rotate-90 size-5 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0' />

                <Moon className='absolute size-5 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />

                <span className='sr-only'>Change theme</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' side='right'>
              <DropdownMenuItem
                data-selected={theme === 'system'}
                className='transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent'
                onClick={() => handleThemeChange('system')}
              >
                System
              </DropdownMenuItem>
              <DropdownMenuItem
                data-selected={theme === 'dark'}
                className='transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent'
                onClick={() => handleThemeChange('dark')}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                data-selected={theme === 'light'}
                className='transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent'
                onClick={() => handleThemeChange('light')}
              >
                Light
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='flex flex-col space-y-2'>
            <Link
              href='https://github.com/PedroL22/22ai'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub repository'
            >
              <Button variant='ghost' size='icon' className='cursor-pointer dark:text-accent-foreground'>
                <Github className='size-5' />
              </Button>
            </Link>

            <Link href='/settings' aria-label='Settings'>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Settings'
                className='cursor-pointer dark:text-accent-foreground'
              >
                <Settings className='size-5' />
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar content */}
        <motion.div
          variants={{
            open: { opacity: 1, pointerEvents: 'auto', transition: { delay: 0.1, duration: 0.2 } },
            closed: { opacity: 0, pointerEvents: 'none', transition: { duration: 0.1 } },
          }}
          animate={isOpen ? 'open' : 'closed'}
          initial='open'
          className='flex w-full min-w-80 flex-col p-4 px-6'
        >
          <div className='mt-2 mb-4 flex w-full items-center justify-center'>
            <Image
              src={
                resolvedTheme === 'light'
                  ? '/images/icons/logotype-dark-text.svg'
                  : '/images/icons/logotype-light-text.svg'
              }
              alt='22AI'
              className='h-14'
              width={200}
              height={200}
            />
          </div>

          <motion.div
            key='chat'
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              type: 'tween',
              duration: 0.15,
            }}
            className='flex min-h-0 flex-1 flex-col space-y-4'
          >
            <Button asChild>
              <Link href='/' onClick={handleNewChatClick}>
                New chat
              </Link>
            </Button>

            <div className='relative min-h-0 flex-1'>
              <div
                ref={scrollContainerRef}
                className='scrollbar-hide absolute inset-0 flex min-h-0 flex-1 flex-col items-center space-y-2.5 overflow-y-auto'
              >
                {(!isSignedIn || chatsDisplayMode === 'local') &&
                !isSyncing &&
                sortedChats.length === 0 &&
                !isInitialLoading ? (
                  <div className='flex size-full items-center justify-center'>
                    <div className='text-center text-muted-foreground text-sm'>No chats yet.</div>
                  </div>
                ) : isSyncing || isInitialLoading ? (
                  <div className='flex size-full items-center justify-center'>
                    <Loader2 className='size-4 animate-spin' />
                  </div>
                ) : (
                  <div className='w-full space-y-4'>
                    {(Object.keys(groupedChats) as Array<keyof typeof groupedChats>).map((groupKey) => {
                      const group = groupedChats[groupKey]
                      if (group.length === 0) return null

                      return (
                        <div key={groupKey} className='space-y-1 pt-1'>
                          <h3 className='px-3 font-medium text-muted-foreground/75 text-xs tracking-wider dark:text-muted-foreground/60'>
                            {groupKey === 'pinned' ? (
                              <div className='flex items-center gap-1'>
                                <Pin className='size-3' />
                                <span>{getGroupLabel(groupKey)}</span>
                              </div>
                            ) : (
                              getGroupLabel(groupKey)
                            )}
                          </h3>

                          <div className='space-y-1'>
                            {group.map((chat) => (
                              <ChatMenu
                                key={chat.id}
                                chatId={chat.id}
                                chatTitle={chat.title}
                                isPinned={chat.isPinned}
                                isShared={chat.isShared}
                                isSelected={chat.id === selectedChatId}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Scroll indicator gradient */}
              <div
                className={`pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-background to-transparent transition-opacity duration-300 ${canScrollDown ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </motion.div>

          {/* User stuff */}
          {!isLoaded ? (
            <div className='flex justify-center pt-11 pb-3'>
              <Loader2 className='size-4 animate-spin' />
            </div>
          ) : isSignedIn ? (
            <div className='flex shrink-0 justify-center pt-4'>
              <DropdownMenu>
                <DropdownMenuTrigger className='group flex cursor-pointer items-center space-x-2 rounded-lg px-5 py-3 transition-all ease-in hover:bg-accent dark:hover:bg-accent/35'>
                  <div className='flex items-center space-x-3'>
                    <Avatar className='size-8'>
                      <AvatarImage src={user?.imageUrl || undefined} alt={user?.fullName || undefined} />

                      <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className='max-w-40 truncate font-medium'>{user?.fullName}</div>
                  </div>

                  <ChevronDown className='mt-1 size-4 transition-all ease-in group-data-[state=open]:rotate-180' />
                </DropdownMenuTrigger>

                <DropdownMenuContent side='top'>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setManageAccountDialogOpen(true)}>
                    <User className='size-4' />
                    <span>Manage account</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='size-4' />

                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className='flex shrink-0 justify-center pt-4'>
              <Link
                href='/sign-in'
                className='flex items-center space-x-2 rounded-lg p-3 transition-all ease-in hover:bg-accent dark:hover:bg-accent/35'
              >
                <LogIn className='size-5' />

                <span className='font-medium'>Sign in</span>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Manage account dialog */}
      <Dialog open={manageAccountDialogOpen} onOpenChange={setManageAccountDialogOpen}>
        <DialogContent className='overflow-auto rounded-2xl border-none p-0 md:max-w-[880px]'>
          <DialogHeader className='sr-only'>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>

          <div className='flex w-full items-center justify-center overflow-hidden'>
            <UserProfile routing='hash' appearance={clerkThemes(resolvedTheme ?? 'dark')} />
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  )
}
