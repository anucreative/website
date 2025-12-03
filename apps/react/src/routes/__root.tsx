/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts, useLocation } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getThemeStyles } from '@monorepo/shared'
import '../styles/global.css'

// Create a client for the app to use
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
})

// Determine theme based on URL path
const getThemeFromPath = (pathname: string): 'default' | 'alan' => {
  if (pathname.includes('/alan')) {
    return 'alan'
  }
  return 'default'
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'anucreative - CV' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()

  const theme = getThemeFromPath(location.pathname)
  const themeStyles = getThemeStyles(theme)

  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <head>
          <HeadContent />
          <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        </head>
        <body>
          <Outlet />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}
