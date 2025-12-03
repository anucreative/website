/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts, useLocation } from '@tanstack/react-router'
import { getThemeStyles } from '@monorepo/shared'
import '../styles/global.css'

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
  )
}
