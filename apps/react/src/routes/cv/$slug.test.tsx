import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Cv } from '@website/data-types'

import { Route, RouteComponent, ErrorComponent } from './$slug'
import { act } from 'react'
import sampleResume from '@website/data-types/cv.json' assert { type: 'json' }
import * as resumeApi from '../../api/cv'
import * as cvComponent from '../../components/CV'

// Mock web components
vi.mock('@website/ui/components', () => ({}))

// Mock our CV component to just render the name for testing
vi.spyOn(cvComponent, 'CV').mockImplementation(({ resume }: { resume: Cv }) => (
  <div data-testid="cv-component">{resume.basics.name}</div>
))

// Have to mock fetchCv as it's a server function
vi.spyOn(resumeApi, 'fetchCv').mockResolvedValue(sampleResume)

const setUpRouter = ({ path, initialEntry = path }: { path: string; initialEntry: string }) => {
  // Root route with minimal Outlet for rendering child routes
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <div data-testid="root-layout"></div>
        <Outlet />
      </>
    ),
  })

  // Index route so '/' always matches
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Index</div>,
  })

  // Test route mounting your Component at the dynamic path
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    loader: Route.options.loader,
    component: RouteComponent,
  })

  // Create the router instance with memory history
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, testRoute]),
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
    defaultPendingMinMs: 0,
  })

  return router
}

describe('/cv/$slug route components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('RouteComponent', () => {
    test('should render CV component with resume data', async () => {
      const router = setUpRouter({ path: '/cv/$slug', initialEntry: '/cv/alan' })

      // Load the route to execute loaders
      await router.load()

      act(() => {
        render(<RouterProvider router={router} />)
      })

      // Wait for CV component with name to render
      expect(await screen.findByTestId('cv-component')).toBeInTheDocument()
      expect(await screen.findByText('Robert Douglas')).toBeInTheDocument()
    })
  })

  describe('ErrorComponent', () => {
    test('should render error component when fetch fails', () => {
      const error = new Error('Failed to fetch resume')

      render(<ErrorComponent error={error} />)

      expect(screen.getByText('Error loading resume')).toBeInTheDocument()
      expect(screen.getByText('Failed to fetch resume')).toBeInTheDocument()
    })

    test('should render error with unknown error message', () => {
      const error = { message: 'Network error' } as unknown as Error

      render(<ErrorComponent error={error} />)

      expect(screen.getByText('Error loading resume')).toBeInTheDocument()
      expect(screen.getByText('Unknown error')).toBeInTheDocument()
    })
  })
})
