import { Meta, StoryObj } from '@storybook/vue3';
import CustomButton, { CustomButtonProps } from './CustomButton.vue';

const meta: Meta<CustomButtonProps & { buttonText: string }> = {
    title: 'Components/Button',
    component: CustomButton,
    argTypes: {
        size: {
            control: 'select',
            options: ['medium', 'large'],
            description: 'The size of the button',
        },
        fullWidthOnMobile: {
            control: { type: 'boolean' },
            description: 'If true, the button takes full width on mobile devices',
        },
        textShape: {
            control: 'select',
            options: ['contained', 'text'],
            description: 'The button’s shape and style',
        },
        colorVariant: {
            control: 'select',
            options: ['primary', 'error', 'success'],
            description: 'The button’s color scheme',
        },
        buttonText: {
            control: 'text',
            description: 'The text displayed on the button',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPrimary: Story = {
    args: {
        size: 'medium',
        textShape: 'contained',
        colorVariant: 'primary',
        buttonText: 'Button text',
    },
    render: (args) => ({
        components: { CustomButton },
        setup() {
            return { args };
        },
        template: '<CustomButton v-bind="args">{{ args.buttonText }}</CustomButton>',
    }),
};

export const LargePrimary: Story = {
    args: {
        size: 'large',
        textShape: 'contained',
        colorVariant: 'primary',
        buttonText: 'Button text',
    },
    render: (args) => ({
        components: { CustomButton },
        setup() {
            return { args };
        },
        template: '<CustomButton v-bind="args">{{ args.buttonText }}</CustomButton>',
    }),
};

export const LargeFullWidthOnMobileSuccess: Story = {
    args: {
        size: 'large',
        textShape: 'contained',
        colorVariant: 'success',
        fullWidthOnMobile: true,
        buttonText: 'Button text',
    },
    render: (args) => ({
        components: { CustomButton },
        setup() {
            return { args };
        },
        template: '<CustomButton v-bind="args">{{ args.buttonText }}</CustomButton>',
    }),
};

export const LargeTextPrimary: Story = {
    args: {
        size: 'large',
        textShape: 'text',
        colorVariant: 'primary',
        buttonText: 'Button text',
    },
    render: (args) => ({
        components: { CustomButton },
        setup() {
            return { args };
        },
        template: '<CustomButton v-bind="args">{{ args.buttonText }}</CustomButton>',
    }),
};

export const LargeTextFullWidthOnMobileError: Story = {
    args: {
        size: 'large',
        textShape: 'text',
        colorVariant: 'error',
        fullWidthOnMobile: true,
        buttonText: 'Button text',
    },
    render: (args) => ({
        components: { CustomButton },
        setup() {
            return { args };
        },
        template: '<CustomButton v-bind="args">{{ args.buttonText }}</CustomButton>',
    }),
};
