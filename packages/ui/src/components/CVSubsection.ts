import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { sectionStyles } from '../shared/section'

/**
 * CVSubsection component - wraps CV subsection with label
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-subsection')
export class CVSubsection extends LitElement {
  static styles = [
    sectionStyles,
    css`
      ::slotted([slot='title']) {
        font-size: var(--typography-font-size-md);
        font-weight: var(--typography-font-weight-semibold);
        color: var(--color-secondary);

        @media (min-width: 768px) {
          font-weight: var(--typography-font-weight-normal);
        }
      }
    `,
  ]

  render() {
    return html`
      <div class="subsection">
        <div class="sidebar">
          <slot name="title"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-subsection': CVSubsection
  }
}
