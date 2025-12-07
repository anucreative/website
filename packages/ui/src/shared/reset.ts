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
    font-family: var(--font-font-family);
    color: var(--color-text);
    background-color: var(--color-background);
    line-height: var(--font-line-height);
    transition:
      color 0.3s ease,
      background-color 0.3s ease;
  }
`
