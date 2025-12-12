import { createServerFn } from '@tanstack/react-start'
import type { CvResponse, Cv } from '@website/data-types'
import { getApiUrl } from '@website/shared'

/**
 * Fetch resume data from FastAPI backend
 */
export const fetchCv = createServerFn({ method: 'GET' })
  .inputValidator((data: string | undefined) => data ?? 'base')
  .handler(async ({ data }: { data?: string }): Promise<Cv> => {
    const slug = data ?? 'base'
    const apiUrl = getApiUrl()

    // Fetch CV by slug
    const url = `${apiUrl}/cv/${slug}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`)
    }

    const payload: CvResponse = await response.json()

    return payload.content
  })
