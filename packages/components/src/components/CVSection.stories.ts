import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSection'
import './CVSectionTitle'

const meta = {
  title: 'Components/CVSection',
  component: 'cv-section',
  render: args => html`
    <cv-section>
      <cv-section-title><h2>${args.title}</h2></cv-section-title>
      <p>Content goes here…</p>
    </cv-section>
  `,
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title with underline',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    title: 'Work experience',
  },
}
