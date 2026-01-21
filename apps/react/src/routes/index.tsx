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
      <h1>anu creative</h1>
      <p>design and development • web and mobile</p>
      <a href="/cv" className={styles.button}>
        View CV <img src={favicon} alt="Photo of Robert Douglas" width={25} height={25} />
      </a>
    </div>
  )
}
