import { Meta, StoryObj } from '@storybook/vue3';
import Button, { ButtonProps } from './Button.vue';

const meta: Meta<ButtonProps & {buttonText: string}> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'select', options: ['medium', 'large'],
      description: 'The size of the button',
    },
    fullWidthOnMobile: {
      control: { type: 'boolean' },
      description: 'If true, the button takes full width on mobile devices',
    },
    textShape: {
      control: 'select', options: ['contained', 'text'],
      description: 'The button’s shape and style',
    },
    colorVariant: {
      control: 'select', options: ['primary', 'error', 'success'],
      description: 'The button’s color scheme',
    },
    buttonText: {
      control: 'text',
      description: 'The text displayed on the button',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPrimary: Story = {
  args: {
    size: 'medium',
    textShape: 'contained',
    colorVariant: 'primary',
    buttonText: 'Button text'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.buttonText }}</Button>',
  }),
};

export const LargePrimary: Story = {
  args: {
    size: 'large',
    textShape: 'contained',
    colorVariant: 'primary',
    buttonText: 'Button text'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.buttonText }}</Button>',
  }),
};

export const LargeFullWidthOnMobilePrimary: Story = {
  args: {
    size: 'large',
    textShape: 'contained',
    colorVariant: 'primary',
    fullWidthOnMobile: true,
    buttonText: 'Button text'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.buttonText }}</Button>',
  }),
};

export const LargeTextPrimary: Story = {
  args: {
    size: 'large',
    textShape: 'text',
    colorVariant: 'primary',
    buttonText: 'Button text'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.buttonText }}</Button>',
  }),
};

export const LargeTextFullWidthOnMobileError: Story = {
  args: {
    size: 'large',
    textShape: 'text',
    colorVariant: 'error',
    fullWidthOnMobile: true,
    buttonText: 'Button text'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.buttonText }}</Button>',
  }),
};
