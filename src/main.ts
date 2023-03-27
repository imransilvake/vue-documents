import './assets/scss/main.scss';
import './assets/fonts/index';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './app/App.vue';
import router from './app/routes';

createApp(App).use(router).use(createPinia()).use(PrimeVue).mount('#app');
