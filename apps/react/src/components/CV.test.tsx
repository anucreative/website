import { describe, test, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import sampleResume from '@website/data-types/cv.json'
import type { Resume } from '@website/data-types'
import { CV } from './CV'

// Mock web components
vi.mock('@website/ui/components', () => ({}))

describe('CV Page Rendering', () => {
  const resume: Resume = sampleResume
  const queryClient = new QueryClient()

  test('should render CV component with resume data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CV resume={resume} />
      </QueryClientProvider>
    )

    // Check that the component renders without errors
    expect(screen.getByText(resume.basics.name)).toBeInTheDocument()

    resume.basics.label && expect(screen.getByText(resume.basics.label)).toBeInTheDocument()
    resume.basics.email && expect(screen.getByText(resume.basics.email)).toBeInTheDocument()
    resume.basics.phone && expect(screen.getByText(resume.basics.phone)).toBeInTheDocument()

    const workName = resume.work?.[0]?.name
    if (workName) {
      expect(screen.getAllByText(workName, { exact: false })?.[0]).toBeInTheDocument()
    }

    const institution = resume.education?.[0]?.institution
    if (institution) {
      expect(screen.getByText(/Education/)).toBeInTheDocument()
      expect(screen.getAllByText(institution, { exact: false })?.[0]).toBeInTheDocument()
    }

    const skill = resume.skills?.[0]?.name
    if (skill) {
      expect(screen.getByText(/Skills/)).toBeInTheDocument()
      expect(screen.getAllByText(skill, { exact: false })?.[0]).toBeInTheDocument()
    }

    const language = resume.languages?.[0]?.language
    if (language) {
      expect(screen.getByText(/Languages/)).toBeInTheDocument()
      expect(screen.getAllByText(language, { exact: false })?.[0]).toBeInTheDocument()
    }

    const interest = resume.interests?.[0]?.name
    if (interest) {
      expect(screen.getByText(/Interests/)).toBeInTheDocument()
      expect(screen.getAllByText(interest, { exact: false })?.[0]).toBeInTheDocument()
    }
  })

  test('should render CV header with image', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CV resume={resume} />
      </QueryClientProvider>
    )

    expect(screen.getByAltText(resume.basics.name)).toBeInTheDocument()
  })
})
