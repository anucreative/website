import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { sectionStyles } from '../shared/section'

/**
 * CVHeader component - displays CV header with name, title, and summary
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-header')
export class CVHeader extends LitElement {
  static styles = [
    sectionStyles,
    css`
      .header {
        margin-bottom: var(--spacing-2xl);
        margin-top: 0;

        .image-container {
          position: relative;
          width: 100px;
          height: 100px;
        }

        ::slotted([slot='title']) {
          font-size: var(--typography-font-size-2xl);
          font-weight: var(--typography-font-weight-bold);
        }

        ::slotted([slot='byline']) {
          font-size: var(--typography-font-size-xl);
          font-weight: var(--typography-font-weight-bold);
          color: var(--color-accent);
        }

        ::slotted([slot='summary']) {
          font-size: var(--typography-font-size-lg);
          color: var(--color-secondary);
          max-width: 100%;
          margin-top: var(--spacing-lg) !important;
        }

        ::slotted([slot='image']) {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
          object-fit: cover;
        }

        ::slotted([slot='brand']) {
          width: 50px;
          height: 50px;
          background-color: var(--color-background);
          border-radius: 50%;
          border: 2px solid var(--color-primary);
          object-fit: cover;
          position: absolute;
          bottom: -5px;
          right: -10px;
        }
      }
    `,
  ]

  render() {
    return html`
      <header class="section header">
        <div class="subsection">
          <div class="sidebar">
            <div class="image-container">
              <a href="/" title="anucreative homepage">
                <slot name="image" class="avatar"></slot>
                <slot name="brand" class="brand"></slot>
              </a>
            </div>
          </div>
          <div class="content">
            <slot name="title"></slot>
            <slot name="byline"></slot>
          </div>
        </div>
        <div class="subsection">
          <div class="sidebar"></div>
          <div class="content">
            <slot name="summary"></slot>
          </div>
        </div>
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-header': CVHeader
  }
}
