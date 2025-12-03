import { useQuery } from '@tanstack/react-query'
import type { Resume } from '@monorepo/data-types'
import sampleResume from '@monorepo/data-types/sample.json'

/**
 * Fetch resume data
 * In production, this would call a real API endpoint
 */
const fetchResume = async (): Promise<Resume> => {
  return sampleResume as Resume
}

/**
 * Hook to fetch and manage resume data with caching
 * Handles loading, error, and success states
 */
export function useResume() {
  return useQuery({
    queryKey: ['resume'],
    queryFn: fetchResume,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  })
}
