import { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from './AppHeader.vue';

const meta: Meta<typeof AppHeader> = {
    title: 'Organisms/AppHeader',
    component: AppHeader,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        showProgressBar: {
            control: 'boolean',
            description: 'Whether to show the progress bar',
        },
        progressBarProps: {
            control: 'object',
            description: 'Properties for the progress bar, if shown',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        showProgressBar: false,
    },
};

export const WithProgressBarWaiting: Story = {
    args: {
        showProgressBar: true,
        progressBarProps: {
            percent: 70,
            variant: 'warning',
            message: 'Очікування',
        },
    },
};

export const WithProgressFirstRound: Story = {
    args: {
        showProgressBar: true,
        progressBarProps: {
            percent: 70,
            variant: 'primary',
            message: 'Раунд 1',
        },
    },
};

export const WithProgressBarComplete: Story = {
    args: {
        showProgressBar: true,
        progressBarProps: {
            percent: 100,
            variant: 'success',
            message: 'Завершено',
        },
    },
};
