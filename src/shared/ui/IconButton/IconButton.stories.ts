import { Meta, StoryObj } from '@storybook/vue3';
import IconButton, { IconButtonProps } from './IconButton.vue';

const meta: Meta<IconButtonProps> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    iconName: {
      control: 'text',
      description: 'The name of the icon from Google Material Icons',
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'warning'],
      description: 'The color variant of the icon',
    },
    paddingSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The padding size of the button',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimarySmall: Story = {
  args: {
    iconName: 'home',
    colorVariant: 'primary',
    paddingSize: 'small',
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args"/>',
  }),
};

export const ErrorMedium: Story = {
  args: {
    iconName: 'error',
    paddingSize: 'medium',
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args"/>',
  }),
};

export const WarningLarge: Story = {
  args: {
    iconName: 'warning',
    paddingSize: 'large',
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args"/>',
  }),
};

export const SuccessNoPadding: Story = {
  args: {
    iconName: 'check_circle',
    paddingSize: 'medium',
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args"/>',
  }),
};

export const SecondaryCustom: Story = {
  args: {
    iconName: 'face',
    paddingSize: 'large',
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args"/>',
  }),
};
