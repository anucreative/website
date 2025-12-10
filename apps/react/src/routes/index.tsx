import { createFileRoute } from '@tanstack/react-router'
import { Logo } from 'src/components/Logo'

export const Route = createFileRoute('/')({
  component: Home,
})

export function Home() {
  return (
    <div className="splash">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <h1>anu creative</h1>
      <p>design and development • web and mobile</p>
      <a href="/cv" className="button">
        View CV
      </a>
    </div>
  )
}
