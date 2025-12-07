import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * CVHeader component - displays CV header with name, title, and social profiles
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-header')
export class CVHeader extends LitElement {
  @property({ type: String }) name: string = ''
  @property({ type: String }) label: string = ''
  @property({ type: String }) summary: string = ''
  @property({ type: Array }) profiles: Array<{ network: string; url: string }> = []

  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--spacing-lg, 2rem);
    }

    .header {
      text-align: center;
      padding: var(--spacing-md, 1.5rem) 0;
    }

    h1 {
      color: var(--color-primary, #333);
      font-size: var(--font-xl, 2rem);
      font-weight: var(--font-bold, 700);
      margin: 0 0 var(--spacing-xs, 0.5rem) 0;
    }

    .label {
      color: var(--color-secondary, #666);
      font-size: var(--font-lg, 1.25rem);
      margin: 0 0 var(--spacing-md, 1.5rem) 0;
    }

    .summary {
      color: var(--color-text, #555);
      font-size: var(--font-sm, 0.875rem);
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto var(--spacing-md, 1.5rem);
    }

    .profiles {
      display: flex;
      justify-content: center;
      gap: var(--spacing-sm, 1rem);
      flex-wrap: wrap;
    }

    a {
      color: var(--color-link, #0066cc);
      text-decoration: none;
      font-size: var(--font-xs, 0.75rem);
      transition: opacity 0.2s;
    }

    a:hover {
      opacity: 0.7;
    }
  `

  render() {
    return html`
      <div class="header">
        <h1>${this.name}</h1>
        ${this.label ? html`<div class="label">${this.label}</div>` : ''}
        ${this.summary ? html`<div class="summary">${this.summary}</div>` : ''}
        ${this.profiles.length > 0
          ? html`
              <div class="profiles">
                ${this.profiles.map(
                  profile => html`
                    <a href="${profile.url}" target="_blank" rel="noopener noreferrer">
                      ${profile.network}
                    </a>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-header': CVHeader
  }
}
