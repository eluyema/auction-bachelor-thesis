import { Meta, StoryObj } from '@storybook/vue3';
import Label from './Label.vue';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    textShape: {
      control: 'select',
      options: ['contained', 'text'],
      description: 'Defines the label’s shape and style',
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'warning', 'success'],
      description: 'Defines the label’s color scheme',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedPrimary: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'primary',
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">Primary</Label>',
  }),
};

export const ContainedWarning: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'warning',
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">Primary</Label>',
  }),
};


export const TextWarning: Story = {
  args: {
    textShape: 'text',
    colorVariant: 'warning',
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">Warning</Label>',
  }),
};


export const ContainedSuccess: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'success',
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">Success</Label>',
  }),
};

export const TextSuccess: Story = {
  args: {
    textShape: 'text',
    colorVariant: 'success',
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">Success</Label>',
  }),
};

