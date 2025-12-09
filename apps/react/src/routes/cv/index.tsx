import { createFileRoute } from '@tanstack/react-router'
import type { Resume } from '@website/data-types'
import { CV } from '../../components/CV'
import { fetchResume } from '../../api/resume'

export const Route = createFileRoute('/cv/')({
  loader: async (): Promise<Resume> => {
    return fetchResume()
  },
  component: CVPage,
  errorComponent: ErrorComponent,
  head: ctx => ({
    meta: [{ title: 'Robert Douglas | CV', description: ctx.loaderData?.basics.summary }],
  }),
})

function CVPage() {
  const resume = Route.useLoaderData()

  if (!resume) {
    return <div className="container">No resume data found</div>
  }

  return <CV resume={resume} />
}

function ErrorComponent({ error }: { error: Error }) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="container error">
      <h1>Error loading resume</h1>
      <p>{message}</p>
    </div>
  )
}
