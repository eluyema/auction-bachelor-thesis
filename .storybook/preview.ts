import '../src/app/assets/styles/theme/index.scss';
import { router } from '../src/app/router';
import { type Preview, setup } from '@storybook/vue3';
import { type App } from 'vue';

import { createPinia } from 'pinia';

const pinia = createPinia();

setup((app: App) => {
    app.use(pinia);
    app.use(router);
});

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'soft',
            values: [
                {
                    name: 'soft',
                    value: '#F1F1F1',
                },
                {
                    name: 'light',
                    value: '#FFF',
                },
            ],
        },
    },
};

export default preview;
