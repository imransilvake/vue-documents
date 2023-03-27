<script setup>
import VDocumentFilters from './VDocumentFilters.vue';
import VDocumentsTable from './VDocumentsTable.vue';
</script>

<template>
	<div class="app-documents">
		<!-- Title -->
		<h1>Documents</h1>

		<!-- Description -->
		<p>Managing all your documents in one place</p>

		<!-- Filters -->
		<VDocumentFilters />

		<!-- Table -->
		<VDocumentsTable />
	</div>
</template>

<style lang="scss" scoped>
.app-documents {
	h1 {
		margin: 0;
		padding-top: pxToRem(50);
	}
	p {
		color: #838cae;
		margin: pxToRem(5) 0 pxToRem(40);
	}
}
</style>
