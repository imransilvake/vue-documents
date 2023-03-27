import { RouteRecordRaw } from 'vue-router';

const appRoutes: RouteRecordRaw[] = [
	{
		name: 'Home',
		path: '/',
		component: () => import('../screens/VHome.vue')
	},
	{
		name: 'Documents',
		path: '/documents',
		component: () => import('../screens/documents/VDocuments.vue')
	}
];
export default appRoutes;
