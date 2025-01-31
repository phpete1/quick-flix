import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import settings from './utils/Settings.js';

const app = createApp(App);

app.config.globalProperties.$settings = new settings();

app.use(router).mount('#app');
