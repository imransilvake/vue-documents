<script setup>
const links = [
	{ label: '© Copyrights' },
	{ label: 'All rights reserved' },
	{ label: 'Imprint' },
	{ label: 'Terms of use' },
	{ label: 'Privacy policy' }
];
</script>

<template>
	<div class="app-footer">
		<ul>
			<template v-for="link in links" :key="link.label">
				<li>{{ link.label }}</li>
			</template>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.app-footer {
	ul {
		text-align: center;
		padding: 0;
		list-style: none;
		li {
			color: #818389;
			font-size: pxToRem(10);
			display: inline;
			padding: 0 pxToRem(10);
			border-left: solid 1px #818389;
			&:first-child {
				border-left: none;
			}
		}
	}
}
</style>
