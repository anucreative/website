import { createFileRoute } from '@tanstack/react-router'
import type { ResumeOutput } from '@website/data-types'
import { CV } from '../../components/CV'
import { fetchResume } from '../../api/resume'

export const Route = createFileRoute('/cv/')({
  loader: async (): Promise<ResumeOutput> => {
    return fetchResume()
  },
  head: ctx => {
    const title = 'Robert Douglas | CV'
    const description = ctx.loaderData?.basics.summary ?? undefined
    return {
      meta: [
        { title: title },
        ...(description ? [{ name: 'description', content: description }] : []),
        { name: 'og:title', content: title },
        ...(description ? [{ name: 'og:description', content: description }] : []),
        { name: 'og:site_name', content: 'anucreative' },
      ],
    }
  },
  component: CVPage,
  errorComponent: ErrorComponent,
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
