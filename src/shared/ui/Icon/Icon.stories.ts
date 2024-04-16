import {Meta, StoryObj} from '@storybook/vue3';
import Icon from './Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    iconName: {
      control: 'select',
      options: ['access_time', 'done', 'trending_down', 'trending_up'],
    },
    colorVariant: {
      control: 'select',
      options: ['', 'primary', 'success', 'warning'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AccessTime: Story = {
  args: {
    iconName: 'access_time',
  },
};

export const Done: Story = {
  args: {
    iconName: 'done',
    colorVariant: 'warning',
  },
};

export const PriceReduction: Story = {
  args: {
    iconName: 'trending_down',
    colorVariant: 'success',
  },
};

export const PriceIncrease: Story = {
  args: {
    iconName: 'trending_up',
  },
};

