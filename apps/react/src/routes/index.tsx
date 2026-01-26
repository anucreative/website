import { createFileRoute } from '@tanstack/react-router'
import { Logo } from 'src/components/Logo'
import styles from './styles.module.css'
import favicon from '/favicon.png'

export const Route = createFileRoute('/')({
  component: Home,
})

export function Home() {
  return (
    <div className={styles.splash}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.content}>
        <h1>anu creative</h1>
        <p>design and development</p>
        <p>web and mobile</p>
        <a href="https://linkedin.com/in/anucreative" className={styles.avatar} target="_blank">
          <img src={favicon} alt="Photo of Robert Douglas" width={40} height={40} />
        </a>
      </div>
    </div>
  )
}
