import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset'
import { sectionStyles } from '../shared/section'
import { typographyStyles } from '../shared/typography'

/**
 * CVSectionTitle component - title for a CV section
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-section-title')
export class CVSectionTitle extends LitElement {
  static styles = [resetStyles, sectionStyles, typographyStyles]

  render() {
    return html`
      <h2 class="title">
        <slot></slot>
      </h2>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cv-section-title': CVSectionTitle
  }
}
