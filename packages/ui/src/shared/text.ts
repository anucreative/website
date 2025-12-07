import { css } from 'lit'

export const textStyles = css`
  h1 {
    font-size: var(--font-h1-size);
    font-weight: var(--font-h1-weight);
  }

  h2 {
    font-size: var(--font-h2-size);
    font-weight: var(--font-h2-weight);
    margin-bottom: var(--spacing-md);
  }

  h3 {
    font-size: var(--font-h3-size);
    font-weight: var(--font-h3-weight);
    margin-bottom: var(--spacing-sm);
  }

  h4 {
    font-size: var(--font-h4-size);
    font-weight: var(--font-h4-weight);
    margin-bottom: var(--spacing-sm);
  }

  /* Links */
  a {
    color: var(--color-accent);
    transition: opacity 0.2s ease;
    font-weight: var(--font-h4-weight);
  }

  a:hover {
    opacity: 0.8;
  }
`
