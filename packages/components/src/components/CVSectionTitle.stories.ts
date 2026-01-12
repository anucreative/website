import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSectionTitle'

const meta = {
  title: 'Components/CVSectionTitle',
  component: 'cv-section-title',
  render: args => html`<cv-section-title><h2>${args.title}</h2></cv-section-title>`,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text for the section',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    title: 'Experience',
  },
}
