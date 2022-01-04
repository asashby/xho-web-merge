<template>
    <div>
        <div class="slider-wrapper">
            <div class="empty-column">

            </div>
            <client-only class="slider-column">
                <Slider
                    class="banner"
                    duration="8000"
                    :speed="500"
                    animation="fade"
                    indicators="false"
                    :interval="5000">
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add500gBasicOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/1.png" alt="">
                    </SliderItem>
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add1kgBasicOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/6.png" alt="">
                    </SliderItem>
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add500gIntermediateOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/2.png" alt="">
                    </SliderItem>
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add1kgIntermediateOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/5.png" alt="">
                    </SliderItem>
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add500gAdvancedOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/3.png" alt="">
                    </SliderItem>
                    <SliderItem class="banner-item">
                        <img class="banner-image" @click="add1kgAdvancedOffer" src="https://xoh-media-bucket.s3.amazonaws.com/tienda/4.png" alt="">
                    </SliderItem>
                </Slider>
            </client-only>
        </div>
        <div class="shop-body-wrapper">
            <div class="categories-wrapper">
                <p class="shop-category-title">
                    CATEGORIAS:
                </p>
                <p class="shop-category-label" @click="$store.commit('selectByAll', products)">
                    TODOS
                </p>
                <p class="shop-category-label" @click="$store.commit('selectByCollagen', products)">
                    COLAGENO
                </p>
                <p class="shop-category-label" @click="$store.commit('selectByImplements', products)">
                    IMPLEMENTOS
                </p>
                <p class="shop-category-label" @click="$store.commit('selectByPromotions', products)">
                    PROMOCIONES
                </p>
                <p class="shop-category-label" @click="$store.commit('selectByProteins', products)">
                    PROTEINAS
                </p>
            </div>
            <div class="shop-items-wrapper">
                <div v-for="product in $store.state.products2" :key="product.id" class="item-card">
                    <div class="item-image-container">
                        <img class="item-image" :src="product.image" alt="">
                        <button
                            class="add-item-button"
                            @click="openProductDetails(product)">
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

function openProductDetails (product) {
	localStorage.setItem('selectedProductId', product.id)
	localStorage.setItem('selectedProductTitle', product.title)
	localStorage.setItem('selectedProductPrice', product.price)
	localStorage.setItem('selectedProductDescription', product.description)
	localStorage.setItem('selectedProductImage', product.image)
	localStorage.setItem('selectedProductSku', product.sku)
	localStorage.setItem('selectedProductCategory', product.category)
	this.$store.commit('setSelectedProduct', product)
	this.$router.push('/tienda/product_details')
}

async function suscribeUserToChallenge (slugName) {
	await this.$store.dispatch('challenges/suscribeUserToChallenge', slugName)
}

export default defineComponent({
	name: 'Product',
	auth: false,
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
		},
		_500gBasicChallenge () {
			return {
				id: 109,
				title: 'PACK ISOXIPRO Whey protein 500g + Entrenamiento básico (1 mes)',
				price: 199.00,
				description: 'Oferta proteína 500 gramos más entrenamiento básico por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-500g.jpg?alt=media&token=78b601fa-71bf-4e91-9ed4-073fc17382f2',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		},
		_1kgBasicChallenge () {
			return {
				id: 15,
				title: 'PACK ISOXIPRO Whey protein isolate + Entrenamiento básico (1 mes)',
				price: 238.00,
				description: 'Oferta proteína 1 kilogramo más entrenamiento básico por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		},
		_500gIntermediateChallenge () {
			return {
				id: 109,
				title: 'PACK ISOXIPRO Whey protein 500g + Entrenamiento intermedio (1 mes)',
				price: 199.00,
				description: 'Oferta proteína 500 gramos más entrenamiento intermedio por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-500g.jpg?alt=media&token=78b601fa-71bf-4e91-9ed4-073fc17382f2',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		},
		_1kgIntermediateChallenge () {
			return {
				id: 15,
				title: 'PACK ISOXIPRO Whey protein isolate + Entrenamiento intermedio (1 mes)',
				price: 238.00,
				description: 'Oferta proteína 1 kilogramo más entrenamiento intermedio por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		},
		_500gAdvancedChallenge () {
			return {
				id: 109,
				title: 'PACK ISOXIPRO Whey protein 500g + Entrenamiento avanzado (1 mes)',
				price: 199.00,
				description: 'Oferta proteína 500 gramos más entrenamiento avanzado por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-500g.jpg?alt=media&token=78b601fa-71bf-4e91-9ed4-073fc17382f2',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		},
		_1kgAdvancedChallenge () {
			return {
				id: 15,
				title: 'PACK ISOXIPRO Whey protein isolate + Entrenamiento avanzado (1 mes)',
				price: 238.00,
				description: 'Oferta proteína 1 kilogramo más entrenamiento avanzado por un mes',
				image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
				sku: 'PIPT-1-1',
				category: 'PROMOCIONES, PROTEINA'
			}
		}
	},
	methods: {
		openProductDetails,
		suscribeUserToChallenge,
		add500gBasicOffer () {
			this.$store.commit('addToCart', {
				product: this._500gBasicChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('basico-en-casa')
			this.$router.push('/tienda/cart')
		},
		add1kgBasicOffer () {
			this.$store.commit('addToCart', {
				product: this._1kgBasicChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('basico-en-casa')
			this.$router.push('/tienda/cart')
		},
		add500gIntermediateOffer () {
			this.$store.commit('addToCart', {
				product: this._500gIntermediateChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('intermedio-en-casa')
			this.$router.push('/tienda/cart')
		},
		add1kgIntermediateOffer () {
			this.$store.commit('addToCart', {
				product: this._1kgIntermediateChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('intermedio-en-casa')
			this.$router.push('/tienda/cart')
		},
		add500gAdvancedOffer () {
			this.$store.commit('addToCart', {
				product: this._500gAdvancedChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('avanzado-en-gym')
			this.$router.push('/tienda/cart')
		},
		add1kgAdvancedOffer () {
			this.$store.commit('addToCart', {
				product: this._1kgAdvancedChallenge,
				quantity: 1
			})
			suscribeUserToChallenge('avanzado-en-gym')
			this.$router.push('/tienda/cart')
		}
	}
})
</script>
<style lang="scss" scoped>

    .slider-wrapper{
        margin-top: 0;

        @media screen and (max-width: 599px) {
            height: 250px;
        }

        @media screen and (min-width: 600px) {
            background-image: url("https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/bg%20(1).png?alt=media&token=c02a4e91-ec77-44f6-b7af-7f1ab49cbbed");
            height: 470px;
            background-size: contain;
            background-repeat:   no-repeat;
            background-position: center center;
        }
    }
    .empty-column{
        float: left;
        width: 50%;
        margin: 0 auto;
    }
    .shop-body-wrapper{
        padding: 75px;
    }
    .shop-items-wrapper{
        justify-content: center;
        margin: 0 auto;
        float: right;

        @media screen and (max-width: 599px) {
            display: inline;
        }

        @media screen and (min-width: 600px) {
            display: grid;
            grid-gap: 50px;
            grid-template-columns: repeat(4, 1fr);
        }
    }
    .categories-wrapper{

        @media screen and (max-width: 599px) {
            display: none;
            margin: 0 auto;
        }

        @media screen and (min-width: 600px) {
            width: 15%;
            flex-direction: column;
            display: inline-block;
            justify-content: left;
            height: 500px;
            float: left;
        }
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

        @media screen and (max-width: 599px) {
            margin-bottom: 25px;
        }
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
        outline: none;
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
        object-fit: cover;
        margin: 0 auto;
        border-radius: 12px;

        @media screen and (max-width: 599px) {
            height: 150px;
        }

        @media screen and (min-width: 600px) {
            height: 300px;
        }
    }
    .banner-image:hover{
        cursor: pointer;
    }
    .banner{
        z-index: 1 !important;

        @media screen and (max-width: 599px) {
            height: 330px !important;
        }

        @media screen and (min-width: 600px) {
            height: 450px !important;
        }
    }
    .banner-item{
        margin-top: 90px;

        @media screen and (max-width: 599px) {
            height: 250px !important;
        }

        @media screen and (min-width: 600px) {
            height: 450px !important;
        }
    }
</style>
