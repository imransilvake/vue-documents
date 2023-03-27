<script setup>
import { computed, onMounted, ref } from 'vue';

import Logo from '/assets/logo.svg';
import { useUserStore } from '@/stores/user/User.store';

import VSidebar from './VSidebar.vue';

const userStore = useUserStore();
userStore.userInfoFetch();

let toggleMenu = ref(false);

// computed
const profile = computed(() => userStore.user?.User.profile);
const initials = computed(() => {
	if (!profile.value) return '';
	const { firstName, lastName } = profile.value;
	return `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`;
});
const name = computed(() => `${profile?.value?.firstName} ${profile?.value?.lastName}`);
const firstName = computed(() => profile?.value?.firstName);
const lastName = computed(() => profile?.value?.lastName);

// events
let windowWidth = ref(window.innerWidth);
const onWidthChange = () => (windowWidth.value = window.innerWidth);
onMounted(() => window.addEventListener('resize', onWidthChange));
const isMobile = computed(() => windowWidth.value <= 730);
</script>

<template>
	<div class="app-header">
		<div class="app-left">
			<img :src="Logo" alt="logo" />
		</div>
		<div v-if="!isMobile && initials" class="app-right">
			<div class="app-account">
				<div class="app-avatar">{{ initials }}</div>
				<div class="app-info">
					<p>{{ name }}</p>
					<p><b>Admin</b></p>
				</div>
			</div>
		</div>
		<div v-else class="app-mobile">
			<i class="pi pi-bars" @click="toggleMenu = !toggleMenu"></i>
			<div v-if="!!toggleMenu" class="app-menu">
				<VSidebar is-mobile @onEmitCloseMenu="toggleMenu = !toggleMenu" />
				<div class="app-line" />
				<div class="app-info">
					<p>{{ firstName }}</p>
					<p>{{ lastName }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.app-header {
	align-items: center;
	background-color: #6200ee;
	display: flex;
	height: pxToRem(70);
	justify-content: space-between;
	.app-left {
		margin-left: calc(pxToRem(100) - pxToRem(35));
	}
	.app-right {
		margin-right: pxToRem(50);

		.app-account {
			align-items: center;
			display: flex;

			.app-avatar {
				align-items: center;
				background-color: #ac7cac;
				border-radius: 50%;
				border: pxToRem(1) solid #fff;
				color: #fff;
				display: flex;
				height: pxToRem(45);
				justify-content: center;
				margin: 0 auto;
				text-align: center;
				width: pxToRem(45);
			}
			.app-info {
				flex: 1;
				margin-left: pxToRem(15);

				p {
					color: #fff;
					margin: 0;

					b {
						font-size: pxToRem(13);
					}
				}
			}
		}
	}
	.app-mobile {
		i {
			color: #fff;
			cursor: pointer;
			margin-right: pxToRem(20);
			&:hover {
				opacity: 0.9;
			}
		}
		.app-menu {
			position: absolute;
			z-index: 9;
			background: #fff;
			box-shadow: pxToRem(1) pxToRem(1) pxToRem(3) #b4adad;
			max-width: pxToRem(250);
			margin-top: pxToRem(26);
			right: pxToRem(3);
			.app-line {
				border-top: 1px solid #b4adad;
				margin: pxToRem(10) 0;
			}
			.app-info {
				p {
					padding: pxToRem(5) pxToRem(20);
					margin: 0;
					&:last-child {
						padding-bottom: pxToRem(10);
					}
				}
			}
		}
	}

	@media screen and (max-width: 730px) {
		.app-left {
			margin-left: pxToRem(20);
		}
	}
}
</style>
