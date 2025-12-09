import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSection'
import './CVSubsection'
import resume from '@website/data-types/cv.json'

const { work, education, skills } = resume
const job = work?.[0]

const meta = {
  title: 'Components/CVSubsection',
  component: 'cv-subsection',
  render: args => html`
    <cv-section>
      <cv-subsection>
        <h3 slot="title">${args.label}</h3>
        <p>Content goes here…</p>
      </cv-subsection>
    </cv-section>
  `,
  argTypes: {
    label: {
      control: 'text',
      description: 'Subsection label',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    label: 'Work Experience',
  },
}
