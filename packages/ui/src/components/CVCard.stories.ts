import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVCard'
import { getThemeStyles } from '@monorepo/shared/themes'
import resume from '@monorepo/data-types/cv.json'

const { work, education } = resume
const workEntry = work?.[0]
const eduEntry = education?.[0]

const meta = {
  title: 'Components/CVCard',
  component: 'cv-card',
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-card
      .title=${args.title}
      .subtitle=${args.subtitle}
      .description=${args.description}
      .date=${args.date}
    ></cv-card>
  `,
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title (e.g., job title)',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle (e.g., company name)',
    },
    description: {
      control: 'text',
      description: 'Card description with details',
    },
    date: {
      control: 'text',
      description: 'Date range or period',
    },
  },
} satisfies Meta<CVCardElement>

export default meta
type Story = StoryObj<CVCardElement>

export const Default: Story = {
  args: {
    title: workEntry?.position,
    subtitle: workEntry?.name,
    date: `${workEntry?.startDate} - ${workEntry?.endDate || 'Present'}`,
    description: workEntry?.summary,
  },
}

export const WorkExperience: Story = {
  args: {
    title: work?.[1]?.position,
    subtitle: work?.[1]?.name,
    date: `${work?.[1]?.startDate} - ${work?.[1]?.endDate}`,
    description: work?.[1]?.summary,
  },
}

export const Education: Story = {
  args: {
    title: `${eduEntry?.studyType} in ${eduEntry?.area}`,
    subtitle: eduEntry?.institution,
    date: `${eduEntry?.startDate} - ${eduEntry?.endDate}`,
    description: `Graduated from ${eduEntry?.institution}`,
  },
}

export const NoDate: Story = {
  args: {
    title: work?.[work.length - 1]?.position,
    subtitle: work?.[work.length - 1]?.name,
    description: work?.[work.length - 1]?.summary,
  },
}

export const AlanTheme: Story = {
  args: {
    title: workEntry?.position,
    subtitle: workEntry?.name,
    date: `${workEntry?.startDate} - ${workEntry?.endDate || 'Present'}`,
    description: workEntry?.summary,
  },
  render: args => html`
    <style>
      ${getThemeStyles('alan')}
    </style>
    <cv-card
      .title=${args.title}
      .subtitle=${args.subtitle}
      .description=${args.description}
      .date=${args.date}
    ></cv-card>
  `,
}

interface CVCardElement {
  title: string
  subtitle: string
  description?: string
  date?: string
}
