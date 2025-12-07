import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './CVSection'
import './CVCard'
import { getThemeStyles } from '@monorepo/shared/themes'
import resume from '@monorepo/data-types/cv.json'

const { work, education, skills } = resume

const meta = {
  title: 'Components/CVSection',
  component: 'cv-section',
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-section .title=${args.title}>
      <cv-card
        title="Senior Engineer"
        subtitle="Tech Corp"
        date="2020 - Present"
        description="Led development of scalable systems"
      ></cv-card>
      <cv-card
        title="Engineer"
        subtitle="StartUp Inc"
        date="2018 - 2020"
        description="Built full-stack features"
      ></cv-card>
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
    title: 'Work Experience',
  },
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-section .title=${args.title}>
      ${work?.map(
        job => html`
          <cv-card
            title=${job.position}
            subtitle=${job.name}
            date="${job.startDate} - ${job.endDate || 'Present'}"
            description=${job.summary}
          ></cv-card>
        `
      )}
    </cv-section>
  `,
}

export const Education: Story = {
  args: {
    title: 'Education',
  },
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-section .title=${args.title}>
      ${education?.map(
        edu => html`
          <cv-card
            title="${edu.studyType} in ${edu.area}"
            subtitle=${edu.institution}
            date="${edu.startDate} - ${edu.endDate}"
          ></cv-card>
        `
      )}
    </cv-section>
  `,
}

export const Skills: Story = {
  args: {
    title: 'Skills',
  },
  render: args => html`
    <style>
      ${getThemeStyles('default')}
    </style>
    <cv-section .title=${args.title}>
      ${skills?.map(
        skill => html`
          <cv-card title=${skill.name} subtitle=${skill.keywords?.join(', ')}></cv-card>
        `
      )}
    </cv-section>
  `,
}

export const AlanTheme: Story = {
  args: {
    title: 'Work Experience',
  },
  render: args => html`
    <style>
      ${getThemeStyles('alan')}
    </style>
    <cv-section .title=${args.title}>
      ${work
        ?.slice(0, 2)
        .map(
          job => html`
            <cv-card
              title=${job.position}
              subtitle=${job.name}
              date="${job.startDate} - ${job.endDate || 'Present'}"
              description=${job.summary}
            ></cv-card>
          `
        )}
    </cv-section>
  `,
}

interface CVSectionElement {
  title: string
}
