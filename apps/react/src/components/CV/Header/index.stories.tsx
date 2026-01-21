import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header, Byline, Image, Logo, Summary, Title } from './index'
import resume from '@website/data-types/cv.json'

const { basics } = resume

const meta = {
  title: 'Components/Header',
  component: Header,
  subcomponents: { Image, Logo, Title, Summary, Byline },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Header {...args}>
      <Image>
        <img src={basics.image} />
      </Image>
      <Logo>
        <img src="https://placehold.co/200" />
      </Logo>
      <Title>{basics.name}</Title>
      <Byline>{basics.label}</Byline>
      <Summary>{basics.summary}</Summary>
      <Summary>{basics.future}</Summary>
    </Header>
  ),
}
