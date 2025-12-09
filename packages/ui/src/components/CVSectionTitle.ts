import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * CVSectionTitle component - title for a CV section
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-section-title')
export class CVSectionTitle extends LitElement {
  static styles = [
    css`
      .content {
        @media (min-width: 768px) {
          margin-left: calc(var(--layout-column-width) + var(--spacing-md));
          margin-bottom: var(--spacing-sm);
        }
      }
    `,
  ]

  render() {
    return html`<div class="content"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-section-title': CVSectionTitle
  }
}
