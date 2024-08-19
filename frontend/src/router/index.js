import { createRouter, createWebHistory } from 'vue-router';
import Orders from '../components/OrdersTable.vue';
import Info from '../components/Info.vue';
const routes = [
    {
        path: '/',
        name: 'Orders',
        component: Orders,
    },
    {
        path: '/info',
        name: 'Info',
        component: Info,
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;