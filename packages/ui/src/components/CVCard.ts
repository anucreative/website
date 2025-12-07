import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * CVCard component - displays a card for CV sections (work, education, etc.)
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-card')
export class CVCard extends LitElement {
  @property({ type: String }) title: string = ''
  @property({ type: String }) subtitle: string = ''
  @property({ type: String }) description: string = ''
  @property({ type: String }) date: string = ''

  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--spacing-md, 1.5rem);
    }

    .card {
      border-left: 3px solid var(--color-accent, #0066cc);
      padding: var(--spacing-md, 1.5rem);
      background-color: var(--color-bg-secondary, #f9f9f9);
      border-radius: var(--spacing-xs, 0.25rem);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-sm, 1rem);
    }

    .card-title {
      color: var(--color-primary, #333);
      font-size: var(--font-lg, 1.25rem);
      font-weight: var(--font-bold, 700);
      margin: 0;
    }

    .card-subtitle {
      color: var(--color-secondary, #666);
      font-size: var(--font-md, 1rem);
      font-style: italic;
      margin: var(--spacing-xs, 0.5rem) 0 0 0;
    }

    .card-date {
      color: var(--color-text-muted, #999);
      font-size: var(--font-sm, 0.875rem);
      white-space: nowrap;
      margin-left: var(--spacing-md, 1.5rem);
    }

    .card-description {
      color: var(--color-text, #555);
      font-size: var(--font-sm, 0.875rem);
      line-height: 1.6;
      margin: 0;
    }
  `

  render() {
    return html`
      <div class="card">
        ${this.title || this.date
          ? html`
              <div class="card-header">
                <div>
                  ${this.title ? html`<h3 class="card-title">${this.title}</h3>` : ''}
                  ${this.subtitle ? html`<p class="card-subtitle">${this.subtitle}</p>` : ''}
                </div>
                ${this.date ? html`<div class="card-date">${this.date}</div>` : ''}
              </div>
            `
          : ''}
        ${this.description ? html`<p class="card-description">${this.description}</p>` : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-card': CVCard
  }
}
