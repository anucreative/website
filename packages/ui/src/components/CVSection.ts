import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset'
import { sectionStyles } from '../shared/section'
import { typographyStyles } from '../shared/typography'

/**
 * CVSection component - wraps CV section with title header
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-section')
export class CVSection extends LitElement {
  static styles = [resetStyles, typographyStyles, sectionStyles]

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
