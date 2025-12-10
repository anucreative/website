import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

export function Home() {
  return (
    <div className="splash">
      <div className="svg-wrapper">
        <svg viewBox="-30 -30 373 165" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>anu creative logo</title>
          <path
            className="anucreative"
            d="M53 0.507948C35.5 0.174615 0.5 10.208 0.5 53.0079C0.5 95.8079 35.5 104.841 53 104.008C70 104.508 104 95.0079 104 53.0079C104 11.0079 139.667 0.507948 157.5 0.507948C175 1.00795 210 12.208 210 53.0079C210 93.8079 245 104.008 262.5 104.008C279 104.508 312 95.0079 312 53.0079V0.507948"
            stroke="white"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1>anu creative</h1>
      <p>design and development • web and mobile</p>
      <a href="/cv" className="button">
        View CV
      </a>
    </div>
  )
}
