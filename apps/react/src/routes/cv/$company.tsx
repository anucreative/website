import { createFileRoute } from '@tanstack/react-router'
import { CV } from '../../components/CV'
import { useResume } from '../../hooks/useResume'

export const Route = createFileRoute('/cv/$company')({
  component: RouteComponent,
})

function RouteComponent() {
  // Theme is determined from the pathname in __root.tsx
  // The $company parameter just allows dynamic routing
  const { data: resume, isLoading, error } = useResume()

  if (isLoading) {
    return <div className="container">Loading resume...</div>
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return <div className="container error">Error: {message}</div>
  }

  if (!resume) {
    return <div className="container">No resume data found</div>
  }

  return <CV resume={resume} />
}
