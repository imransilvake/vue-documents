<script setup lang="ts">
import { ref } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';

import appRoutes from '../routes/Routes';

const emit = defineEmits(['onEmitCloseMenu']);

// props
const props = defineProps({ isMobile: Boolean });

// current path
const router = useRouter();
let currentPath = ref<RouteRecordRaw | null>(null);
const { pathname } = window.location;

/**
 * change route
 * @param route
 */
const changeRoute = (route: RouteRecordRaw) => {
	currentPath.value = route;
	router.push(route);
	emit('onEmitCloseMenu');
};
</script>

<template>
	<div class="app-sidebar" :class="{ 'app-mobile': props.isMobile }">
		<template v-for="route in appRoutes" :key="route.path">
			<ul @click="() => changeRoute(route)">
				<li :class="{ 'app-active': currentPath?.name === route.name || (!currentPath && pathname === route.path) }">
					<h3>{{ route.name }}</h3>
				</li>
			</ul>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.app-sidebar {
	background-color: #fff;
	box-shadow: pxToRem(2) pxToRem(6) pxToRem(6) #ddd;
	min-height: calc(100vh - pxToRem(70));
	height: 100%;
	padding-top: pxToRem(50);
	width: pxToRem(200);
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			border-left: pxToRem(3) solid transparent;
			cursor: pointer;
			padding: pxToRem(10) pxToRem(20);
			&.app-active {
				background-color: #f7f7f7;
				border-left: pxToRem(3) solid #6200ee;
				h3 {
					font-weight: bold;
				}
			}
			&:hover {
				background-color: #f7f7f7;
			}
			h3 {
				color: #202020;
				font-weight: 400;
				font-size: pxToRem(17);
				padding: 0;
				margin: 0;
			}
		}
	}
	&.app-mobile {
		padding: 0;
		margin: 0;
		box-shadow: none;
		height: auto;
		min-height: auto;
		ul {
			li {
				&.app-active {
					background-color: #6200ee;
					border-left: none;
					h3 {
						color: #fff;
						font-weight: normal;
					}
				}
			}
		}
	}
	@media screen and (max-width: 730px) {
		&:not(.app-mobile) {
			display: none;
		}
	}
}
</style>
