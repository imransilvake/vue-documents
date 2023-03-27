import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import appRoutes from './Routes';

// routes
const routes: Array<RouteRecordRaw> = [...appRoutes];

// router
const router = createRouter({
	history: createWebHistory(),
	routes
});
export default router;
