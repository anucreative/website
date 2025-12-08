import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset'
import { sectionStyles } from '../shared/section'
import { typographyStyles } from '../shared/typography'

/**
 * CVHeader component - displays CV header with name, title, and summary
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-header')
export class CVHeader extends LitElement {
  @property({ type: String }) name: string = ''
  @property({ type: String }) image: string = ''
  @property({ type: String }) label: string = ''
  @property({ type: String }) summary: string = ''

  static styles = [
    resetStyles,
    typographyStyles,
    sectionStyles,
    css`
      .header {
        margin-bottom: var(--spacing-2xl);
        margin-top: 0;

        .byline {
          font-size: var(--typography-font-size-xl);
          font-weight: var(--typography-font-weight-bold);
          color: var(--color-accent);
        }

        .intro {
          font-size: var(--typography-font-size-lg);
          color: var(--color-secondary);
          max-width: 100%;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
        }
      }
    `,
  ]

  render() {
    return html`
      <header class="section header">
        <div class="subsection">
          <div class="label">
            ${this.image ? html`<img src="${this.image}" alt="${this.name}" class="avatar" />` : ''}
          </div>
          <div class="content">
            <h1>${this.name}</h1>
            ${this.label ? html`<p class="byline">${this.label}</p>` : ''}
          </div>
        </div>
        ${this.summary
          ? html` <div class="subsection">
              <div class="label"></div>
              <div class="content">
                <p class="intro">${this.summary}</p>
              </div>
            </div>`
          : ''}
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-header': CVHeader
  }
}
