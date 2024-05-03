import { createApp } from 'vue';
import 'src/app/assets/styles/theme/index.scss';
import App from './App.vue';
import { config } from './config';

const { rootAppId } = config;

createApp(App).mount(rootAppId);
