import { ClerkProvider } from '@clerk/tanstack-react-start'
import { Analytics } from '@vercel/analytics/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'

import '~/styles/globals.css'

import { ChatSyncProvider } from '~/components/ChatSyncProvider'
import { ThemeProvider } from '~/components/ThemeProvider'
import { Toaster } from '~/components/ui/sonner'
import { AppLayout } from '~/components/AppLayout'
import { TRPCReactProvider } from '~/trpc/react'

const geistFont =
  '"DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: '22AI' },
      { name: 'description', content: 'T3 Chat clone for cloneathon. I really like the number 22.' },
      { name: 'application-name', content: '22AI' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: '22AI' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#1e1e20', media: '(prefers-color-scheme: dark)' },
    ],
    links: [
      { rel: 'icon', href: '/images/icons/logo.svg' },
      { rel: 'apple-touch-icon', href: '/images/icons/app-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/images/icons/logo.svg', color: '#000000' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang='en' style={{ fontFamily: geistFont }} suppressHydrationWarning>
          <head>
            <meta charSet='UTF-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
            <HeadContent />
          </head>
          <body>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <main className='min-h-svh bg-[url("/images/bg/light-background.svg")] bg-center bg-cover dark:bg-[url("/images/bg/dark-background.svg")]'>
                <TRPCReactProvider>
                  <ChatSyncProvider />
                  <Analytics />
                  <Toaster />
                  <AppLayout>
                    <Outlet />
                  </AppLayout>
                </TRPCReactProvider>
              </main>
            </ThemeProvider>
            <Scripts />
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
