import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

try {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
} catch (error) {
       console.error('Failed to initialize the Vue application:', error);
}
