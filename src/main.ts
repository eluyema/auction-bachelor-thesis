import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'src/app/assets/styles/theme/index.scss';
import App from './App.vue';
import { config } from './config';
import { router } from './app/router';
import { bootstrapServices } from './bootstrapServices';

const { rootAppId } = config;

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.provide('services', bootstrapServices());

app.mount(rootAppId);
