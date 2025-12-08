import type { DOMAttributes } from 'react'
import type { CVHeader } from '@monorepo/ui'
import type { CVSection } from '@monorepo/ui'
import type { CVSectionTitle } from '@monorepo/ui'
import type { CVSubsection } from '@monorepo/ui'

type CustomElement<T> = Partial<
  T & DOMAttributes<T> & { children: any; class?: string; key?: string | number }
>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'cv-header': CustomElement<CVHeader>
      'cv-section': CustomElement<CVSection>
      'cv-section-title': CustomElement<CVSectionTitle>
      'cv-subsection': CustomElement<CVSubsection> & { title?: string }
    }
  }
}
