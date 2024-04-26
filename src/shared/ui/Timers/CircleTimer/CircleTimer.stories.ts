import { Meta, StoryObj } from '@storybook/vue3'
import CircleTimer from './CircleTimer.vue'

const meta: Meta<typeof CircleTimer> = {
    title: 'Components/CircleTimer',
    component: CircleTimer,
    argTypes: {
        time: {
            control: 'number',
            description: 'Countdown time in milliseconds'
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const CircleTimer30sec: Story = {
    args: {
        time: 30
    },
    render: (args) => ({
        components: { CircleTimer },
        setup() {
            return { args }
        },
        template: '<CircleTimer v-bind="args"></CircleTimer>'
    })
}

export const CircleTimer1min30sec: Story = {
    args: {
        time: 90
    },
    render: (args) => ({
        components: { CircleTimer },
        setup() {
            return { args }
        },
        template: '<CircleTimer v-bind="args"></CircleTimer>'
    })
}

export const CircleTimer1hour: Story = {
    args: {
        time: 60 * 60
    },
    render: (args) => ({
        components: { CircleTimer },
        setup() {
            return { args }
        },
        template: '<CircleTimer v-bind="args"></CircleTimer>'
    })
}
