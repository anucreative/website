import { createFileRoute } from '@tanstack/react-router'
import type { Resume } from '@website/data-types'
import { CV } from '../../components/CV'
import { fetchResume } from '../../api/resume'

export const Route = createFileRoute('/cv/$company')({
  loader: async (): Promise<Resume> => {
    return fetchResume()
  },
  head: ctx => {
    const title = 'Robert Douglas | CV'
    const description = ctx.loaderData?.basics.summary
    return {
      meta: [
        { title: title },
        { name: 'description', content: description },
        { name: 'og:title', content: title },
        { name: 'og:description', content: description },
        { name: 'og:site_name', content: 'anucreative' },
      ],
    }
  },
  component: RouteComponent,
  errorComponent: ErrorComponent,
})

export function RouteComponent() {
  const resume = Route.useLoaderData()

  if (!resume) {
    return <div className="container">No resume data found</div>
  }

  return <CV resume={resume} />
}

export function ErrorComponent({ error }: { error: Error }) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="container error">
      <h1>Error loading resume</h1>
      <p>{message}</p>
    </div>
  )
}
