import type { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'

/**
 * Section component - wraps CV section
 */
export function Section({ children }: ComponentPropsWithoutRef<'section'>) {
  return <section className={styles.section}>{children}</section>
}

/**
 * Title component - title for a CV section
 */
function Title({ children }: ComponentPropsWithoutRef<'h2'>) {
  return <h2 className={styles.title}>{children}</h2>
}

export default { Section, Title }
