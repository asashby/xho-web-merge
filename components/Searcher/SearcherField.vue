<template>
	<v-text-field
		class="x-searcher--field__desktop"
		filled
		rounded
		clearable
		hide-details
		prepend-icon="mdi-magnify"
		placeholder="Buscar..."
		@keydown="handleEnterPress"
		@input="handleClearEvent"
	></v-text-field>
</template>

<script>
export default {
	name: 'SearcherField',
	methods: {
		handleClearEvent (ev) {
			if (ev === null) {
				this.$emit('enter', null)
			}
		},
		handleEnterPress (ev) {
			if (ev.code === 'Enter') {
				this.$emit('enter', ev.target.value)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.x-searcher--field__desktop{
		border: 3px solid #90d701;
		background-color: #343432;
		color: gray;
	}
</style>
