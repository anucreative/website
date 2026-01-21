import { createFileRoute } from '@tanstack/react-router'
import { CVError, CVLayout } from '.'

export const Route = createFileRoute('/cv/$company')({
  // Inherits loader and head from parent /cv route
  component: CVLayout,
  errorComponent: CVError,
})
