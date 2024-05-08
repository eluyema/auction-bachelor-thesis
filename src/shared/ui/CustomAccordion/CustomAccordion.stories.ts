import { Meta, StoryObj } from '@storybook/vue3';
import CustomAccordion from './CustomAccordion.vue';

const meta: Meta = {
    title: 'Components/Accordion',
    component: CustomAccordion,
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the accordion header',
        },
        default: {
            control: 'text',
            description: 'The default slot content for the accordion',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAccordion: Story = {
    args: {
        title: 'Деталі закупівлі',
        default: 'This is the default accordion content. Expand to see more.',
    },
    render: (args) => ({
        components: { CustomAccordion },
        setup() {
            return { args };
        },
        template: `<CustomAccordion :title="args.title">{{ args.default }}</CustomAccordion>`,
    }),
};

export const CustomContentAccordion: Story = {
    args: {
        title: 'Деталі закупівлі',
        default: 'Here you can put custom content, such as images, lists, or other components.',
    },
    render: (args) => ({
        components: { CustomAccordion },
        setup() {
            return { args };
        },
        template: `<CustomAccordion :title="args.title">{{ args.default }}</CustomAccordion>`,
    }),
};

export const LongContentAccordion: Story = {
    args: {
        title: 'Деталі закупівлі',
        default:
            'This accordion contains a long block of text to demonstrate scrolling content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.',
    },
    render: (args) => ({
        components: { CustomAccordion },
        setup() {
            return { args };
        },
        template: `<CustomAccordion :title="args.title">{{ args.default }}</CustomAccordion>`,
    }),
};
