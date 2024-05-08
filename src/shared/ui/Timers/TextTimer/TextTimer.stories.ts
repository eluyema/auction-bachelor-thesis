import { Meta, StoryObj } from '@storybook/vue3';
import TextTimer from './TextTimer.vue';

const meta: Meta<typeof TextTimer> = {
    title: 'Components/TextTimer',
    component: TextTimer,
    argTypes: {
        time: {
            control: 'number',
            description: 'Countdown time in seconds',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story for 1 day
export const Timer1Day: Story = {
    args: {
        time: 86400, // 1 day in seconds
    },
    render: (args) => ({
        components: { TextTimer },
        setup() {
            return { args };
        },
        template: '<TextTimer v-bind="args" />',
    }),
};

// Story for 2 days and 3 hours
export const Timer2Days3Hours: Story = {
    args: {
        time: 2 * 86400 + 3 * 3600, // 2 days and 3 hours in seconds
    },
    render: (args) => ({
        components: { TextTimer },
        setup() {
            return { args };
        },
        template: '<TextTimer v-bind="args" />',
    }),
};

// Story for 2 days and 3 hours
export const Timer3Hours30Minutes: Story = {
    args: {
        time: 3 * 3600 + 3600 * 0.5, // 2 days and 3 hours in seconds
    },
    render: (args) => ({
        components: { TextTimer },
        setup() {
            return { args };
        },
        template: '<TextTimer v-bind="args" />',
    }),
};

export const Timer30Minutes20seconds: Story = {
    args: {
        time: 3600 * 0.5 + 20, // 2 days and 3 hours in seconds
    },
    render: (args) => ({
        components: { TextTimer },
        setup() {
            return { args };
        },
        template: '<TextTimer v-bind="args" />',
    }),
};

export const Timer20seconds: Story = {
    args: {
        time: 20, // 2 days and 3 hours in seconds
    },
    render: (args) => ({
        components: { TextTimer },
        setup() {
            return { args };
        },
        template: '<TextTimer v-bind="args" />',
    }),
};
