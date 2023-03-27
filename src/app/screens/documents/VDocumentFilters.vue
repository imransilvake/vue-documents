<script setup>
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import { computed, onMounted, ref } from 'vue';

import { useDocumentsStore } from '@/stores/documents/Documents.store';

const documentsStore = useDocumentsStore();

let showFilters = ref(false);
let from = ref();
let to = ref();

// events
let windowWidth = ref(window.innerWidth);
const onWidthChange = () => (windowWidth.value = window.innerWidth);
onMounted(() => window.addEventListener('resize', onWidthChange));
const isMobile = computed(() => windowWidth.value <= 932);

/**
 * apply filters
 */
const applyFilters = () => {
	documentsStore.documentsFetch({ from: from.value, to: to.value });
	showFilters.value = false;
};

/**
 * clear filters
 */
const clearFilters = () => {
	from.value = '';
	to.value = '';
	documentsStore.documentsFetch({ from: from.value, to: to.value });
	showFilters.value = false;
};
</script>

<template>
	<div class="app-filters-wrapper">
		<!-- Mobile -->
		<div v-if="isMobile" class="app-mobile-filter">
			<Button label="Filters" size="small" icon="pi pi-filter-fill" rounded @click="showFilters = true" />
		</div>

		<!-- Menu -->
		<div v-if="!isMobile || (isMobile && showFilters)" class="app-filters" :class="{ 'app-menu': isMobile }">
			<div class="app-calendar">
				<Calendar v-model="from" show-icon placeholder="From" date-format="dd-mm-yy" />
			</div>
			<div class="app-calendar">
				<Calendar v-model="to" show-icon placeholder="To" date-format="dd-mm-yy" :min-date="from || null" />
			</div>
			<div class="app-button app-button-apply">
				<Button label="Apply filters" size="small" rounded :disabled="!from || !to" @click="applyFilters" />
			</div>
			<div class="app-button app-button-clear">
				<Button label="Clear Filters" size="small" rounded @click="clearFilters" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.app-filters-wrapper {
	.app-mobile-filter {
		.p-button {
			border-color: #f6ae3f;
			background: #f6ae3f;
			&:focus {
				box-shadow: none;
			}
		}
	}
	.app-filters {
		display: flex;
		align-items: center;
		&.app-menu {
			position: absolute;
			z-index: 9;
			padding: pxToRem(14);
			background: #f1f6ff;
			box-shadow: 1px 1px 3px #b4adad;
			max-width: pxToRem(250);
			margin-top: pxToRem(10);
		}
		.app-calendar {
			&:nth-of-type(2) {
				margin-left: pxToRem(20);
			}
			.p-calendar {
				.p-inputtext {
					border: none;
					color: #848dae;
					width: pxToRem(115);
					&::placeholder {
						color: #848dae;
						opacity: 1; /* Firefox */
					}
				}
				.p-button {
					background-color: #fff;
					border: none;
					.pi-calendar {
						&::before {
							color: #848dae;
						}
					}
				}
			}
		}
		.app-button {
			margin-left: pxToRem(20);
			&.app-button-apply {
				.p-button {
					border-color: #f6ae3f;
					background: #f6ae3f;
				}
			}
			&.app-button-clear {
				.p-button {
					border-color: #6200ee;
					background: #6200ee;
				}
			}
		}
	}
	@media screen and (max-width: 932px) {
		.app-filters {
			flex-wrap: wrap;
			.app-calendar {
				width: 100%;
				&:nth-of-type(2) {
					margin-left: 0;
					margin-top: pxToRem(10);
				}
				.p-calendar {
					width: 100%;
					.p-inputtext {
						width: 100%;
					}
				}
			}
			.app-button {
				width: 100%;
				margin-left: 0;
				margin-top: pxToRem(10);
				button {
					width: 100%;
				}
			}
		}
	}
}
</style>
