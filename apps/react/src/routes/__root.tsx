/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FONTS } from '@website/ui/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

export const Route = createRootRoute({
  head: ({ params }: { params: { company?: string } }) => {
    const title = 'Robert Douglas | anucreative'
    const description = 'design and development for web and mobile'

    const fontsUrlParams = FONTS.map(font => `family=${font}:wght@400;600;700;900`).join('&')

    return {
      links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          href: `https://fonts.googleapis.com/css2?${fontsUrlParams}&display=swap&subset=latin`,
          rel: 'stylesheet',
        },
        { rel: 'stylesheet', href: `/assets/global.css` },
        { rel: 'stylesheet', href: `/assets/default.css` },
        { rel: 'stylesheet', href: `/assets/${params.company || 'default'}.css` },
        { rel: 'icon', href: '/favicon.png', type: 'image/x-icon' },
      ],
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: title },
        { name: 'description', content: description },
        { name: 'og:title', content: title },
        { name: 'og:description', content: description },
        { name: 'og:site_name', content: 'anucreative' },
      ],
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}
