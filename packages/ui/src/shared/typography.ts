import { css } from 'lit'

export const typographyStyles = css`
  h1 {
    font-size: var(--typography-font-size-2xl);
    font-weight: var(--typography-font-weight-bold);
  }

  h2 {
    font-size: var(--typography-font-size-xl);
    font-weight: var(--typography-font-weight-semibold);
    margin-bottom: var(--spacing-md);
  }

  h3 {
    font-size: var(--typography-font-size-lg);
    font-weight: var(--typography-font-weight-semibold);
    margin-bottom: var(--spacing-sm);
  }

  h4 {
    font-size: var(--typography-font-size-md);
    font-weight: var(--typography-font-weight-semibold);
    margin-bottom: var(--spacing-sm);
  }

  /* Links */
  a {
    color: var(--color-accent);
    transition: opacity 0.2s ease;
    font-weight: var(--typography-font-weight-semibold);
  }

  a:hover {
    opacity: 0.8;
  }
`
