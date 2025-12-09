import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import type { Resume } from '@website/data-types'

// Mock web components
vi.mock('@website/ui/components', () => ({}))

// Mock the CV component to simplify testing
vi.mock('../../components/CV', () => ({
  CV: ({ resume }: { resume: Resume }) => (
    <div data-testid="cv-component">{resume.basics.name}</div>
  ),
}))

// Import the components
import { RouteComponent, ErrorComponent } from './$company'
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { fetchResume } from '../../api/resume'

const setUpRouter = ({
  path,
  fetcher,
}: {
  path: string
  fetcher?: () => Promise<Resume | null>
}) => {
  const rootRoute = createRootRoute({})
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    loader: async (): Promise<Resume | null> => {
      console.debug('Loader called for path:', path)
      return fetcher ? fetcher() : fetchResume()
    },
    component: RouteComponent,
  })
  const routeTree = rootRoute.addChildren([indexRoute])
  const router = createRouter({ routeTree })

  return router
}

describe('/cv/$company route components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('RouteComponent', () => {
    it('should render CV component with resume data', async () => {
      const router = setUpRouter({ path: '/cv', fetcher: fetchResume })

      act(() => {
        router.navigate({ to: '/cv' })
      })

      render(<RouterProvider router={router} />)

      expect(screen.queryByTestId('cv-component')).not.toBeInTheDocument()
      expect(await screen.findByText('Robert Douglas')).toBeInTheDocument()
    })
  })

  describe('ErrorComponent', () => {
    it('should render error component when fetch fails', () => {
      const error = new Error('Failed to fetch resume')

      render(<ErrorComponent error={error} />)

      expect(screen.getByText('Error loading resume')).toBeInTheDocument()
      expect(screen.getByText('Failed to fetch resume')).toBeInTheDocument()
    })

    it('should render error with unknown error message', () => {
      const error = { message: 'Network error' } as unknown as Error

      render(<ErrorComponent error={error} />)

      expect(screen.getByText('Error loading resume')).toBeInTheDocument()
      expect(screen.getByText('Unknown error')).toBeInTheDocument()
    })
  })
})
