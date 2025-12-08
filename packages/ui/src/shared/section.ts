import { css } from 'lit'

export const sectionStyles = css`
  .section {
    margin-top: var(--spacing-2xl);
  }

  .title {
    @media (min-width: 768px) {
      margin-left: calc(var(--layout-column-width) + var(--spacing-md));
    }
  }

  .subsection {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: var(--spacing-lg);

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }
  }

  .label {
    font-size: var(--typography-font-size-md);
    font-weight: var(--typography-font-weight-semibold);
    color: var(--color-secondary);
    width: var(--layout-column-width);
    margin-bottom: var(--spacing-xs);

    @media (min-width: 768px) {
      text-align: right;
      margin-bottom: 0;
      font-weight: var(--typography-font-weight-normal);

      &:not(:empty):not(:has(img)):after {
        content: ':';
      }
    }
  }

  .content {
    flex: 1;
  }
`
