import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset'
import { sectionStyles } from '../shared/section'
import { textStyles } from '../shared/text'

/**
 * CVSubsection component - wraps CV subsection with label
 * Uses CSS variables from theme system for consistent styling
 */
@customElement('cv-subsection')
export class CVSubsection extends LitElement {
  @property({ type: String }) label: string = ''

  static styles = [resetStyles, textStyles, sectionStyles]

  render() {
    return html`
      <div class="subsection">
        ${this.label ? html`<h3 class="label">${this.label}</h3>` : ''}
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
