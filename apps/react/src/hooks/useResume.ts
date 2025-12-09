import { useQuery } from '@tanstack/react-query'
import type { Resume } from '@monorepo/data-types'
import { fetchResume } from '../api/resume'

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
