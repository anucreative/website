import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * CVSection component - wraps CV section with title header
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-section')
export class CVSection extends LitElement {
  static styles = [
    css`
      .section {
        margin-top: var(--spacing-2xl);
      }
    `,
  ]

  render() {
    return html`
      <div class="section">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-section': CVSection
  }
}
