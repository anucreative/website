/**
 * MSW Handlers for CV API
 */

import { http, HttpResponse } from 'msw'
import type { CvResponse } from '@website/data-types'
import sampleResume from '@website/data-types/cv.json' assert { type: 'json' }
import { getApiUrl } from '@website/shared'

export const cvResponse: CvResponse = {
  id: 'base',
  name: 'base',
  slug: 'base',
  type: 'base',
  content: sampleResume,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

/**
 * Mock API endpoints
 */
export const handlers = [
  /**
   * GET /cv
   * Returns the sample cv data
   */
  http.get(`${getApiUrl()}/cv`, () => {
    return HttpResponse.json<CvResponse>(cvResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),

  /**
   * GET /cv/:slug
   * Returns cv by slug (currently returns sample for all slugs)
   */
  http.get(`${getApiUrl()}/cv/*`, () => {
    console.log(`[MSW] Fetching cv: base`)

    // For now, return sample data for any ID
    // Later, this can be extended to support multiple cvs
    return HttpResponse.json<CvResponse>(cvResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
]
