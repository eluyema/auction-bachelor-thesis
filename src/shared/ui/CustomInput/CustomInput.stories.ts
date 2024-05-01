import { Meta, StoryObj } from '@storybook/vue3'
import CustomInput from './CustomInput.vue'

const meta: Meta<typeof CustomInput> = {
    title: 'Components/CustomInput',
    component: CustomInput,
    argTypes: {
        modelValue: { control: 'text' },
        label: { control: 'text' },
        error: { control: 'boolean' }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const WithoutLabel: Story = {
    args: {
        modelValue: '',
        error: false
    }
}

export const WithLabel: Story = {
    args: {
        modelValue: '',
        label: 'від 0 до 364',
        error: false
    }
}

export const WithLabelAndError: Story = {
    args: {
        modelValue: '',
        label: 'від 0 до 364',
        error: true
    }
}
