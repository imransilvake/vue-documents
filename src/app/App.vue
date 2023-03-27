<script setup lang="ts">
import VFooter from './frame/VFooter.vue';
import VHeader from './frame/VHeader.vue';
import VSidebar from './frame/VSidebar.vue';
</script>

<template>
	<div class="app-documents">
		<VHeader />
		<div class="app-content">
			<div>
				<VSidebar />
			</div>
			<div class="app-screens">
				<router-view />
				<VFooter />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.app-documents {
	.app-content {
		display: flex;
		.app-screens {
			margin: 0 pxToRem(50);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	@media screen and (max-width: 730px) {
		.app-content {
			.app-screens {
				margin: 0 pxToRem(20);
			}
		}
	}
}
</style>
