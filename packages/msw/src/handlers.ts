/**
 * MSW Handlers for CV/Resume API
 * Intercepts HTTP requests and returns mock data
 */

import { http, HttpResponse } from 'msw'
import type { Resume } from '@website/data-types'
import sampleResume from '@website/data-types/cv.json' assert { type: 'json' }

/**
 * Mock API endpoints
 */
export const handlers = [
  /**
   * GET /api/resume
   * Returns the sample resume data
   */
  http.get('/api/resume', () => {
    return HttpResponse.json<Resume>(sampleResume as Resume, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),

  /**
   * GET /api/resume/:id
   * Returns resume by ID (currently returns sample for all IDs)
   * In Phase 6, this will query a real database
   */
  http.get('/api/resume/:id', ({ params }) => {
    const { id } = params
    console.log(`[MSW] Fetching resume: ${id}`)

    // For now, return sample data for any ID
    // Later, this can be extended to support multiple resumes
    return HttpResponse.json<Resume>(sampleResume as Resume, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
]
