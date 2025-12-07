import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVHeader'
import { getThemeStyles } from '@monorepo/shared/themes'
import resume from '@monorepo/data-types/cv.json'

const { basics } = resume

const meta = {
  title: 'Components/CVHeader',
  component: 'cv-header',
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-header
      .name=${args.name}
      .label=${args.label}
      .summary=${args.summary}
      .profiles=${args.profiles}
    ></cv-header>
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
    summary: {
      control: 'text',
      description: 'Brief bio or summary',
    },
    profiles: {
      control: 'object',
      description: 'Array of social profile links',
    },
  },
} satisfies Meta<CVHeaderElement>

export default meta
type Story = StoryObj<CVHeaderElement>

export const Default: Story = {
  args: {
    name: basics.name,
    label: basics.label,
    summary: basics.summary,
    profiles: basics.profiles,
  },
}

export const WithoutSummary: Story = {
  args: {
    name: basics.name,
    label: basics.label,
    profiles: basics.profiles?.slice(0, 2),
  },
}

export const MinimalHeader: Story = {
  args: {
    name: basics.name,
    label: basics.label,
  },
}

export const AlanTheme: Story = {
  args: {
    name: basics.name,
    label: basics.label,
    summary: basics.summary,
    profiles: basics.profiles,
  },
  render: args => html`
    <style>
      ${getThemeStyles('alan')}
    </style>
    <cv-header
      .name=${args.name}
      .label=${args.label}
      .summary=${args.summary}
      .profiles=${args.profiles}
    ></cv-header>
  `,
}

interface CVHeaderElement {
  name: string
  label: string
  summary?: string
  profiles?: Array<{ network: string; url: string }>
}
