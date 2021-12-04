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
	props: {
		productTitle: {
			default: '',
			type: String
		},
		image: {
			default: '',
			type: String
		},
		price: {
			default: 0,
			type: Float32Array
		}
	},
	setup () {

	}
})
</script>
<style scoped>

</style>
