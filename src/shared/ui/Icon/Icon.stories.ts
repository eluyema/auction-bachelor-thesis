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
    isActive: {
      control: 'boolean',
    },
    activeColorVariant: {
      control: 'select',
      options: ['primary', 'success', 'warning'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AccessTime: Story = {
  args: {
    iconName: 'access_time',
    isActive: false,
    activeColorVariant: 'success',
  },
};

export const Done: Story = {
  args: {
    iconName: 'done',
    isActive: true,
    activeColorVariant: 'warning',
  },
};

export const PriceReduction: Story = {
  args: {
    iconName: 'trending_down',
    isActive: true,
    activeColorVariant: 'success',
  },
};

export const PriceIncrease: Story = {
  args: {
    iconName: 'trending_up',
    isActive: true,
    activeColorVariant: 'primary',
  },
};

