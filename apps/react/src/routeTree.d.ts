import { FileRouteByPath } from '@tanstack/react-router'

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof rootRoute
      parentRoute: never
    }
    '/cv': {
      id: '/cv'
      path: '/cv'
      fullPath: '/cv'
      preLoaderRoute: typeof cvRoute
      parentRoute: typeof rootRoute
    }
  }
}

import { Route as rootRoute } from './routes/__root'
import { Route as cvRoute } from './routes/cv'
