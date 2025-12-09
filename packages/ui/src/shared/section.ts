import { css } from 'lit'

export const sectionStyles = css`
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

  .sidebar {
    margin-bottom: var(--spacing-xs);

    @media (min-width: 768px) {
      width: 150px;
      margin-bottom: 0;
      text-align: right;
    }
  }

  .content {
    flex: 1;
  }
`
