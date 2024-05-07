import { Meta, StoryObj } from '@storybook/vue3';
import RegistrationForm from './RegistrationForm.vue';

const meta: Meta<typeof RegistrationForm> = {
    title: 'Organisms/RegistrationForm',
    component: RegistrationForm,
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