<script lang="ts" setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

import { useDocumentsStore } from '@/stores/documents/Documents.store';

const documentsStore = useDocumentsStore();
documentsStore.documentsFetch();
</script>

<template>
	<div class="app-table">
		<DataTable paginator :value="documentsStore.documents" :rows="5">
			<Column field="name" header="Document Name" />
			<Column field="date" header="Created on" />
		</DataTable>
	</div>
</template>

<style lang="scss">
.app-table {
	margin-top: pxToRem(30);
	.p-datatable-table {
		table-layout: fixed;
		.p-datatable-thead {
			tr {
				th {
					background-color: #f1f6ff;
					border: none;
					color: #7e87a9;
					font-weight: 400;
					font-size: pxToRem(14);
				}
			}
		}
		.p-datatable-tbody {
			tr {
				td {
					font-size: pxToRem(14);
					height: pxToRem(60);
					word-break: break-word;
				}
			}
		}
	}
	.p-paginator-bottom {
		.p-paginator {
			justify-content: end;
			.p-paginator-prev,
			.p-paginator-next,
			.p-paginator-page {
				border: 1px solid #ddd;
				border-radius: pxToRem(4);
				min-width: pxToRem(32);
				height: pxToRem(32);
				&.p-highlight {
					border: 1px solid #6200ee;
					background: #6200ee;
					color: #fff;
				}
				&:hover {
					background: #6200ee;
					color: #fff;
				}
			}
			.p-paginator-first,
			.p-paginator-last {
				display: none;
			}
		}
	}
}
</style>
