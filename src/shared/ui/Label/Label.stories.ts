import { Meta, StoryObj } from '@storybook/vue3';
import Label, {LabelProps} from './Label.vue';

const meta: Meta<LabelProps & {labelText: string}> = {
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
    labelText: {
      control: {
         type: 'text',
      }
    }
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedPrimary: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'primary',
    labelText: 'Primary'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">{{args.labelText}}</Label>',
  }),
};

export const ContainedWarning: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'warning',
    labelText: 'Primary'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">{{args.labelText}}</Label>',
  }),
};


export const TextWarning: Story = {
  args: {
    textShape: 'text',
    colorVariant: 'warning',
    labelText: 'Warning'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">{{args.labelText}}</Label>',
  }),
};


export const ContainedSuccess: Story = {
  args: {
    textShape: 'contained',
    colorVariant: 'success',
    labelText: 'Success'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">{{args.labelText}}</Label>',
  }),
};

export const TextSuccess: Story = {
  args: {
    textShape: 'text',
    colorVariant: 'success',
    labelText: 'Success'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args">{{args.labelText}}</Label>',
  }),
};

