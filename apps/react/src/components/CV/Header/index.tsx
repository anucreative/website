import React from 'react'
import styles from './styles.module.css'
import { Section } from '../Section'

/**
 * Header component - displays CV header with name, title, and summary
 */
export function Header({ children }: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={styles.header}>
      <Section>{children}</Section>
    </header>
  )
}

export function Image({ children }: React.ComponentPropsWithoutRef<'div'>) {
  return !!children ? <div className={styles.image}>{children}</div> : null
}

export function Logo({ children }: React.ComponentPropsWithoutRef<'div'>) {
  return !!children ? <div className={styles.brand}>{children}</div> : null
}

export function Title({ children }: React.ComponentPropsWithoutRef<'h1'>) {
  return !!children ? <h1 className={styles.title}>{children}</h1> : null
}

export function Byline({ children }: React.ComponentPropsWithoutRef<'h2'>) {
  return !!children ? <h2 className={styles.byline}>{children}</h2> : null
}

export function Summary({ children }: React.ComponentPropsWithoutRef<'p'>) {
  return !!children ? <p className={styles.summary}>{children}</p> : null
}

export default { Header, Image, Logo, Title, Byline, Summary }
