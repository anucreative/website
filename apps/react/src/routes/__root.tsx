/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts, useParams } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import globalCSS from '@monorepo/ui/global.css?raw'
import defaultCSS from '@monorepo/tokens/default.css?raw'
import alanCSS from '@monorepo/tokens/alan.css?raw'

// Create a client for the app to use
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
})

// Determine theme based on company param
const getThemeFromCompany = (company?: string): 'default' | 'alan' => {
  if (company === 'alan') {
    return 'alan'
  }
  return 'default'
}

export const Route = createRootRoute({
  head: () => {
    return {
      links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Alan+Sans:wght@400;500;600;700&family=Lato:wght@400;500;600;900&display=swap&subset=latin',
          rel: 'stylesheet',
        },
      ],
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'anucreative - CV' },
      ],
      styles: [{ children: globalCSS }],
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const params = useParams({ strict: false })
  const theme = getThemeFromCompany(params.company)
  const themeStyles = theme === 'alan' ? alanCSS : defaultCSS

  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <head>
          <HeadContent />
          <style key={`theme-${theme}`}>{themeStyles}</style>
        </head>
        <body>
          <Outlet />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}
