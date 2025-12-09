import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSection'
import './CVSectionTitle'
import resume from '@website/data-types/cv.json'

const { work, education, skills } = resume

const meta = {
  title: 'Components/CVSection',
  component: 'cv-section',
  render: args => html`
    <cv-section>
      <cv-section-title>${args.title}</cv-section-title>
      Content goes here…
    </cv-section>
  `,
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title with underline',
    },
  },
} satisfies Meta<CVSectionElement>

export default meta
type Story = StoryObj<CVSectionElement>

export const Default: Story = {
  args: {
    title: 'Work experience',
  },
}

interface CVSectionElement {
  title: string
}
