import { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from './AppHeader.vue';

const meta: Meta<typeof AppHeader> = {
    title: 'Components/Header',
    component: AppHeader,
    parameters: {
        backgrounds: {
            default: 'dark',
        },
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const DefaultHeader: Story = {
    args: {},
    render: (args) => ({
        components: { AppHeader },
        setup() {
            return { args };
        },
        template: '<AppHeader />'
    })
};

export const AlteredLogoHeader: Story = {
    render: (args) => ({
        components: { AppHeader },
        setup() {
            return { args };
        },
        template: '<AppHeader />'
    })
};

export const CustomSocialLinksHeader: Story = {
    render: (args) => ({
        components: { AppHeader },
        setup() {
            return { args };
        },
        template: '<AppHeader />'
    })
};

// Header with Custom Icon
export const CustomIconHeader: Story = {
    render: (args) => ({
        components: { AppHeader },
        setup() {
            return { args };
        },
        template: '<AppHeader />'
    })
};
