import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useResume } from './useResume'

describe('useResume', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  it('should fetch resume data successfully via MSW', async () => {
    const { result } = renderHook(() => useResume(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.basics).toBeDefined()
    expect(result.current.data?.basics.name).toBe('Robert Douglas')
  })

  it('should have isLoading true initially', () => {
    const { result } = renderHook(() => useResume(), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })

  it('should not have error on successful fetch', async () => {
    const { result } = renderHook(() => useResume(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBeNull()
  })

  it('should use cache with 1 hour stale time', async () => {
    const { result: result1 } = renderHook(() => useResume(), { wrapper })

    await waitFor(() => {
      expect(result1.current.isLoading).toBe(false)
    })

    const firstData = result1.current.data

    // Render the hook again - should use cache
    const { result: result2 } = renderHook(() => useResume(), { wrapper })

    expect(result2.current.data).toBe(firstData)
  })

  it('should have consistent queryKey for caching', async () => {
    const { result } = renderHook(() => useResume(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Verify the query is cached with the correct key
    const query = queryClient.getQueryData(['resume'])
    expect(query).toBeDefined()
  })
})
