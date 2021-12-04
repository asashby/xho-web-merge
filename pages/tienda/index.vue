<template>
    <div>
        <ShopBar />
        <div class="shop-items-wrapper">
            <div class="item-card" v-for="product in products" :key="product.id">
                <img class="item-image" :src="product.image" alt="">
                <p class="text"> {{product.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import products from '@/api/productsData'
import ShopBar from '~/components/ShopBar'

export default defineComponent({
	name: 'product',
	computed: {
		products () {
			return products
		}
	},
	mounted () {
		this.$store.dispatch('fetchProducts')
	},
	components: {
		ShopBar
	},
	setup () {

	}
})
</script>
<style lang="scss" scoped>

    .shop-items-wrapper{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        justify-content: center;
        margin: 0 auto;
        margin-top: 75px;
    }
    .item-card{
        justify-content: center;
        margin: 0 auto;
        width: 300px;
    }
    .item-card:hover{
        opacity: 0.8;
        cursor: pointer;
    }
    .text{
        color: white;
        margin: 0 auto;
    }
    .item-image{
        height: 300px;
        width: 300px;
        border-radius: 8px;
    }
</style>
