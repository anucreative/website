import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVHeader'
import resume from '@website/data-types/cv.json'

const { basics } = resume

const meta = {
  title: 'Components/CVHeader',
  component: 'cv-header',
  render: args => html`
    <cv-header>
      ${args.image ? html`<img slot="image" src=${args.image} alt="Avatar" />` : ''}
      <h1 slot="title">${args.name}</h1>
      <p slot="byline">${args.label}</p>
      ${args.summary ? html`<p slot="summary">${args.summary}</p>` : ''}
    </cv-header>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'Full name displayed in header',
    },
    label: {
      control: 'text',
      description: 'Job title or label',
    },
    image: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    summary: {
      control: 'text',
      description: 'Brief bio or summary',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    name: basics.name,
    label: basics.label,
    summary: basics.summary,
    image: basics.image,
  },
}

export const WithoutSummary: Story = {
  args: {
    name: basics.name,
    label: basics.label,
    image: basics.image,
  },
}

export const MinimalHeader: Story = {
  args: {
    name: basics.name,
    label: basics.label,
  },
}
