import { css } from 'lit'

export const sectionStyles = css`
  .section {
    margin-top: var(--spacing-2xl);

    .title {
      @media (min-width: 768px) {
        margin-left: calc(var(--format-column-width) + var(--spacing-md));
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

      .label {
        font-size: var(--font-font-size);
        font-weight: var(--font-h1-weight);
        color: var(--color-text-light);
        width: var(--format-column-width);
        margin-bottom: var(--spacing-xs);

        @media (min-width: 768px) {
          text-align: right;
          margin-bottom: 0;
          font-weight: var(--font-h4-weight);

          &:not(:empty):not(:has(img)):after {
            content: ':';
          }
        }
      }

      .content {
        flex: 1;
      }
    }
  }
`
