<template>
	<v-dialog
		content-class="modal-container"
		:value="value">
		<div>
            <p></p>
        </div>
	</v-dialog>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	setup () {

	},
	props: {
		productTitle: {
			default: '',
			type: String
		}
	}
})
</script>
<style scoped>

</style>
