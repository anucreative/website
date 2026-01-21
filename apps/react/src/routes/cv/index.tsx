import { createFileRoute, ResolveParams } from '@tanstack/react-router'
import type { Resume } from '@website/data-types'
import { fetchResume } from '../../api/resume'
import { CV } from '../../components/CV'

export const Route = createFileRoute('/cv/')({
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
  component: CVLayout,
  errorComponent: CVError,
})

export function CVLayout() {
  const data = Route.useLoaderData()
  const match = Route.useMatch()
  // Override params type to access company param
  const params = match.params as ResolveParams<'/cv/$company'>

  if (!data) {
    return <CVError error={new Error('Error loading CV')} />
  }

  return <CV company={params.company} resume={data} />
}

export function CVError({ error }: { error: Error }) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="container error">
      <h1>Error loading resume</h1>
      <p>{message}</p>
    </div>
  )
}
