<template>
    <div class="product-details-wrapper">
        <!--<div class="product-details-image-wrapper">
            <picture>
                <img :src="image" alt="Imagen del producto">
            </picture>
        </div>-->
        <div class="product-details-info">
            <p class="product-text">
                {{this.productData}}
            </p>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { defineComponent } from '@vue/composition-api'

function fetch () {
	// const { product } = this.$route.params
	console.log(this.$route.params)
	// await this.$store.dispatch('products/getDetails', slugProducts)
}

export default defineComponent({
	name: 'ProductDetails',
	props: {
		productinfo: {
			default: localStorage.getItem('selectedProduct'),
			type: String
		}
	},
	data: () => ({
		productData: localStorage.getItem('selectedProduct')
	}),
	setup () {

	},
	computed: {
		...mapState('products', {
			product: state => state.details
		})
	},
	fetch
})
</script>
<style scoped>
    .product-text{
        color: white;
    }
</style>
