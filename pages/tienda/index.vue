<template>
    <div>
        <client-only>
            <Slider
                class="banner"
                :duration="5000"
                :speed="2000">
                <SliderItem class="banner-item">
                    <img class="banner-image" src="https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo.jpg?alt=media&token=5d9c801e-a810-4bdf-9993-d19b4ce87831" alt="">
                </SliderItem>
                <SliderItem class="banner-item">
                    <img class="banner-image" src="https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo2.jpg?alt=media&token=e98fb3ae-9add-401b-b4dc-44d06ac68398" alt="">
                </SliderItem>
                <SliderItem class="banner-item">
                    <img class="banner-image" src="https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo3.jpg?alt=media&token=d8c95639-c157-4749-8372-bf4d95f1f33c" alt="">
                </SliderItem>
            </Slider>
        </client-only>
        <div class="shop-body-wrapper">
            <div class="categories-wrapper">
                <p class="shop-category-title">
                    CATEGORIAS:
                </p>
                <p class="shop-category-label">
                    TODOS
                </p>
                <p class="shop-category-label">
                    COLAGENO
                </p>
                <p class="shop-category-label">
                    IMPLEMENTOS
                </p>
                <p class="shop-category-label">
                    PROMOCIONES
                </p>
                <p class="shop-category-label">
                    PROTEINAS
                </p>
            </div>
            <div class="shop-items-wrapper">
                <div class="item-card" v-for="product in products" :key="product.id">
                    <div class="item-image-container">
                        <img class="item-image" :src="product.image" alt="">
                        <button class="add-item-button">
                            <p class="text-button">VER</p>
                        </button>
                    </div>
                    <p class="text"> {{ product.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import products from '@/api/productsData'
import { Slider, SliderItem } from 'vue-easy-slider'

export default defineComponent({
	name: 'Product',
	components: {
		Slider,
		SliderItem
	},
	setup () {

	},
	data () {
		return {
			images: [
				{ url: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo.jpg?alt=media&token=5d9c801e-a810-4bdf-9993-d19b4ce87831' },
				{ url: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo2.jpg?alt=media&token=e98fb3ae-9add-401b-b4dc-44d06ac68398' },
				{ url: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/promo3.jpg?alt=media&token=d8c95639-c157-4749-8372-bf4d95f1f33c' }
			]
		}
	},
	computed: {
		products () {
			return products
		}
	},
	mounted () {
		this.$store.dispatch('fetchProducts')
	}
})
</script>
<style lang="scss" scoped>

    .shop-body-wrapper{
        padding: 75px;
    }
    .shop-items-wrapper{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 50px;
        justify-content: center;
        margin: 0 auto;
        float: right;
    }
    .categories-wrapper{
        width: 15%;
		flex-direction: column;
		display: inline-block;
		justify-content: left;
        height: 500px;
        float: left;
    }
    .shop-category-title{
        font-size: 16;
        color: white;
        margin: 0 auto;
        height: 65px;
        font-weight: 700;
    }
    .shop-category-label{
        font-size: 16;
        color: white;
        margin: 0 auto;
        height: 50px;
    }
    .shop-category-label:hover{
        color: #50d2d4;
        cursor: pointer;
    }
    .shop-category-label:active{
        color: #50d2d4;
    }
    .item-card{
        justify-content: center;
        margin: 0 auto;
        width: 250px;
    }
    .item-card:hover{
        cursor: pointer;
    }
    .item-card:hover .add-item-button{
        height: 35px;
        transition: .3s ease;
    }
    .item-card:hover .text-button{
		font-size: 14px !important;
        transition: .3s ease;
    }
    .item-image-container{
        position: relative;
    }
    .add-item-button{
		background-color: #50d2d4;
		height: 0px;
		width: 100%;
		margin: 0 auto;
        position: absolute;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .add-item-button:hover{
        background-color: #3BA6A8;
        cursor: pointer;
    }
    .text-button{
		font-family: 'Poppins' !important;
		font-size: 0px !important;
		margin-bottom: 0px !important;
        font-weight: 200;
		color: white;
    }
    .text{
        text-align: center;
        color: white;
        margin: 0 auto;
    }
    .item-image{
        height: 250px;
        width: 250px;
        border-radius: 8px;
        text-align: center;
    }
    .banner-image{
        height: 300px;
        object-fit: cover;
        margin: 0 auto;
    }
    .banner{
        margin-top: 100px;
        height: 450px;
    }
    .banner-item{
        height: 450px;
    }
</style>
