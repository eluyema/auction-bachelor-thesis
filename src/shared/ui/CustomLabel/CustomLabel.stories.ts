import { Meta, StoryObj } from '@storybook/vue3'
import CustomLabel, { CustomLabelProps } from './CustomLabel.vue'

const meta: Meta<CustomLabelProps & { labelText: string }> = {
    title: 'Components/Label',
    component: CustomLabel,
    argTypes: {
        textShape: {
            control: 'select',
            options: ['contained', 'text'],
            description: 'Defines the label’s shape and style'
        },
        colorVariant: {
            control: 'select',
            options: ['primary', 'warning', 'success'],
            description: 'Defines the label’s color scheme'
        },
        labelText: {
            control: {
                type: 'text'
            }
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const ContainedPrimary: Story = {
    args: {
        textShape: 'contained',
        colorVariant: 'primary',
        labelText: 'Primary'
    },
    render: (args) => ({
        components: { CustomLabel },
        setup() {
            return { args }
        },
        template: '<CustomLabel v-bind="args">{{args.labelText}}</CustomLabel>'
    })
}

export const ContainedWarning: Story = {
    args: {
        textShape: 'contained',
        colorVariant: 'warning',
        labelText: 'Primary'
    },
    render: (args) => ({
        components: { CustomLabel },
        setup() {
            return { args }
        },
        template: '<CustomLabel v-bind="args">{{args.labelText}}</CustomLabel>'
    })
}

export const TextWarning: Story = {
    args: {
        textShape: 'text',
        colorVariant: 'warning',
        labelText: 'Warning'
    },
    render: (args) => ({
        components: { CustomLabel },
        setup() {
            return { args }
        },
        template: '<CustomLabel v-bind="args">{{args.labelText}}</CustomLabel>'
    })
}

export const ContainedSuccess: Story = {
    args: {
        textShape: 'contained',
        colorVariant: 'success',
        labelText: 'Success'
    },
    render: (args) => ({
        components: { CustomLabel },
        setup() {
            return { args }
        },
        template: '<CustomLabel v-bind="args">{{args.labelText}}</CustomLabel>'
    })
}

export const TextSuccess: Story = {
    args: {
        textShape: 'text',
        colorVariant: 'success',
        labelText: 'Success'
    },
    render: (args) => ({
        components: { CustomLabel },
        setup() {
            return { args }
        },
        template: '<CustomLabel v-bind="args">{{args.labelText}}</CustomLabel>'
    })
}
