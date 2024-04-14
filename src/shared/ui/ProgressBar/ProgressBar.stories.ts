import { Meta, StoryObj } from '@storybook/vue3';
import ProgressBar from './ProgressBar.vue';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percent: {
      control: 'number',
      description: 'The current progress percentage',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'warning',
        'success',
      ],
      description: 'The visual theme of the progress bar',
    },
    message: {
      control: 'text',
      description: 'Optional message to display',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryLowProgress: Story = {
  args: {
    percent: 0,
    variant: 'primary',
    message: 'Primary low progress',
  },
};

export const PrimaryMiddleProgress: Story = {
  args: {
    percent: 70,
    variant: 'primary',
    message: 'Primary middle progress',
  },
};

export const PrimaryFullProgress: Story = {
  args: {
    percent: 100,
    variant: 'primary',
    message: 'Primary full progress',
  },
};


export const SuccessLowProgress: Story = {
  args: {
    percent: 0,
    variant: 'success',
    message: 'Success low progress',
  },
};

export const SuccessMiddleProgress: Story = {
  args: {
    percent: 70,
    variant: 'success',
    message: 'Success middle progress',
  },
};


export const SuccessFullProgress: Story = {
  args: {
    percent: 100,
    variant: 'success',
    message: 'Success full progress',
  },
};


export const WarningLowProgress: Story = {
  args: {
    percent: 0,
    variant: 'warning',
    message: 'Warning low progress',
  },
};

export const WarningMiddleProgress: Story = {
  args: {
    percent: 70,
    variant: 'warning',
    message: 'Warning middle progress',
  },
};

export const WarningFullProgress: Story = {
  args: {
    percent: 100,
    variant: 'warning',
    message: 'Warning full progress',
  },
};
