import { Meta, StoryObj } from '@storybook/vue3';
import LoginForm from './LoginForm.vue';

const meta: Meta<typeof LoginForm> = {
    title: 'Organisms/LoginForm',
    component: LoginForm,
    parameters: {
        backgrounds: {
            default: 'light',
        },

    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {

}