import { createServerFn } from '@tanstack/react-start'
import type { CvResponse, CvOutput } from '@website/data-types'
import { API_ENDPOINTS } from '@website/shared'

/**
 * Fetch resume data from FastAPI backend
 */
export const fetchResume = createServerFn().handler(async (x): Promise<CvOutput> => {
  console.debug('fetchResume', x)
  const id = 'e1a15a6f-b6c8-4431-b60f-79b308185a16'
  const baseUrl = API_ENDPOINTS.PYTHON_API_URL

  // If no ID provided, fetch the base CV
  const url = id ? `${baseUrl}/cv/${id}` : `${baseUrl}/cv`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch resume: ${response.statusText}`)
  }

  const data: CvResponse | CvResponse[] = await response.json()

  // If fetching list of CVs, return the first one (base CV)
  if (Array.isArray(data)) {
    return data[0].content
  }

  return data.content
})
