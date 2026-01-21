import { type ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.css'

/**
 * Item component - single line in the CV
 */
function Item({ children }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={styles.subsection}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

/**
 * Content component - content of lines in CV
 */
function Content({ children }: ComponentPropsWithoutRef<'p'>) {
  return <p className={styles.item}>{children}</p>
}

/**
 * Title component - title of line in CV
 */

type TitleProps = ComponentPropsWithoutRef<'h3'> & { as?: React.ElementType }

function Title({ as: Component = 'h3', children }: TitleProps) {
  return <Component className={styles.title}>{children}</Component>
}

export default { Item, Content, Title }
