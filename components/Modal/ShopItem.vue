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
	name: 'ProductDetails',
	components: {
	},
	props: {
		productTitle: {
			default: '',
			type: String
		},
		description: {
			default: '',
			type: String
		},
		image: {
			default: '',
			type: String
		},
		price: {
			default: 0,
			type: Number
		},
		sku: {
			default: '',
			type: String
		},
		category: {
			default: '',
			type: String
		}
	},
	setup () {

	}
})
</script>
<style scoped>

</style>
