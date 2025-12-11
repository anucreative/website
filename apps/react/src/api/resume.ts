import type { ResumeOutput } from '@website/data-types'
import sampleResume from '@website/data-types/cv.json'

/**
 * Fetch resume data
 * In production, this would call a real API endpoint
 */
export const fetchResume = async (): Promise<ResumeOutput> => {
  return sampleResume as ResumeOutput
}
