import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * CVSection component - wraps CV section with title header
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-section')
export class CVSection extends LitElement {
  @property({ type: String }) title: string = ''

  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--spacing-lg, 2rem);
    }

    .section {
      width: 100%;
    }

    .section-title {
      color: var(--color-primary, #333);
      font-size: var(--font-lg, 1.25rem);
      font-weight: var(--font-bold, 700);
      border-bottom: 2px solid var(--color-accent, #0066cc);
      padding-bottom: var(--spacing-xs, 0.5rem);
      margin: 0 0 var(--spacing-md, 1.5rem) 0;
    }

    .section-content {
      padding-left: var(--spacing-md, 1.5rem);
    }
  `

  render() {
    return html`
      <div class="section">
        ${this.title ? html`<h2 class="section-title">${this.title}</h2>` : ''}
        <div class="section-content">
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'section-container': CVSection
  }
}
