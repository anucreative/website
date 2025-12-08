import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSectionTitle'

const meta = {
  title: 'Components/CVSectionTitle',
  component: 'cv-section-title',
  render: args => html`<cv-section-title>${args.title}</cv-section-title>`,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text for the section',
    },
  },
} satisfies Meta<CVSectionTitleElement>

export default meta
type Story = StoryObj<CVSectionTitleElement>

export const Default: Story = {
  args: {
    title: 'Experience',
  },
}

interface CVSectionTitleElement {
  title: string
}
