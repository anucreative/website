import { css } from 'lit'

export const resetStyles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: var(--typography-font-family);
    color: var(--color-text);
    background-color: var(--color-background);
    line-height: var(--typography-line-height-md);
    transition:
      color 0.3s ease,
      background-color 0.3s ease;
  }
`
