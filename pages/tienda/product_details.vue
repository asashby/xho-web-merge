<template>
    <div class="product-details-wrapper">
        <div class="product-details-image-wrapper">
            <picture>
                <img class="product-details-image-archive" :src="productImage" alt="Imagen del producto">
            </picture>
        </div>
        <div class="product-details-info">
            <p class="product-title">
                {{productTitle}}
            </p>
            <p class="product-price">
                S/{{productPrice}}
            </p>
            <p class="product-description">
                {{productDescription}}
            </p>
            <div class="add-to-cart-wrapper">
                <div class="add-to-cart-selector">
                    <button class="add-to-cart-selector-button" @click="decrement">
                        <p class="add-to-cart-selector-sign">
                            -
                        </p>
                    </button>
                    <div class="add-to-cart-count">
                        <p class="add-to-cart-count-text">
                            {{count}}
                        </p>
                    </div>
                    <button class="add-to-cart-selector-button" @click="increment">
                        <p class="add-to-cart-selector-sign">
                            +
                        </p>
                    </button>
                </div>
                <button class="add-to-cart-button" @click="addToCart">
                    <p class="add-to-cart-text">
                        AÑADIR AL CARRITO
                    </p>
                </button>
            </div>
            <hr class="product-divider">
            <div class="product-extras-wrapper">
                <div class="product-extras-segment">
                    <p class="product-extras-key">
                        SKU:
                    </p>
                    <p class="product-extras-value">
                        {{productSku}}
                    </p>
                </div>
                <div class="product-extras-segment">
                    <p class="product-extras-key">
                        Categoría:
                    </p>
                    <p class="product-extras-value">
                        {{productCategory}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ProductDetails',
	setup () {

	},
	data: () => ({
		productId: localStorage.getItem('selectedProductId'),
		productTitle: localStorage.getItem('selectedProductTitle'),
		productPrice: localStorage.getItem('selectedProductPrice'),
		productDescription: localStorage.getItem('selectedProductDescription'),
		productImage: localStorage.getItem('selectedProductImage'),
		productSku: localStorage.getItem('selectedProductSku'),
		productCategory: localStorage.getItem('selectedProductCategory')
	}),
	computed: {
		...mapState('products', {
			product: state => state.details
		}),
		count () {
			return this.$store.getters.getProductsCount
		},
		product () {
			return this.$store.getters.getSelectedProduct
		}
	},
	methods: {
		addToCart () {
			this.$store.commit('addToCart', {
				product: this.product,
				quantity: this.count
			})
			this.$router.push('/tienda/cart')
		},
		decrement () {
			this.$store.commit('decrementProductsCount')
		},
		increment () {
			this.$store.commit('incrementProductsCount')
		}
	}
})
</script>
<style scoped>
    .product-details-wrapper{
        width: 100%;

        @media screen and (max-width: 599px){
            display: inline;
        }

        @media screen and (min-width: 600px) {
            display: table;
            clear: both;
        }
    }
    .product-details-image-wrapper{
        margin: auto;
        display: flex;
        align-items: center;
        margin-top: 65px;

        @media screen and (max-width: 599px){
            width: 100%;
            padding-left: 25px;
            padding-right: 25px;
        }

        @media screen and (min-width: 600px) {
            width: 50%;
            float: left;
            padding: 40px;
            justify-content: right;
        }
    }
    .product-details-image-archive{
        object-fit: contain;
        margin: auto;
        border-radius: 20px;

        @media screen and (max-width: 599px){
            width: 100%;
        }

        @media screen and (min-width: 600px) {
            height: 500px;
        }
    }
    .product-details-info{
        display: inline;
        justify-content: left;
        align-items: center;

        @media screen and (max-width: 599px){
            width: 100%;
        }

        @media screen and (min-width: 600px) {
            padding-top: 40px;
            padding-left: 40px;
            padding-right: 125px;
            margin-top: 65px;
            min-height: 100%;
            width: 50%;
            float: right;
        }
    }
    .product-title{
		font-family: 'Poppins' !important;
		font-size: 32px !important;
        color: white;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .product-price{
		font-family: 'Poppins' !important;
		font-size: 26px !important;
        color: #50d2d4;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .product-description{
		font-family: 'Poppins' !important;
		font-size: 14px !important;
        color: white;
        font-weight: 300;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .product-divider{
        margin-top: 20px;
        margin-bottom: 20px;
        border-top: 3px solid #bbb;

        @media screen and (max-width: 599px){
            margin-left: 25px;
            margin-right: 25px;
        }
    }
    .add-to-cart-wrapper{
        display: flex;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .add-to-cart-selector{
        display: inline-flex;
        vertical-align: top;
        white-space: nowrap;
    }
    .add-to-cart-selector-button{
        min-width: 25px;
        height: 42px;
        border: 2px solid rgba(129,129,129,.2);
        background: 0 0;
        box-shadow: none;
        outline: none;
    }
    .add-to-cart-selector-button:focus{
        outline: 0 !important;
    }
    .add-to-cart-selector-button:hover{
        cursor: pointer;
        background-color: #50d2d4;
    }
    .add-to-cart-selector-sign{
        color: white;
        font-size: 14px;
        margin: 0 auto;
        text-align: center;
    }
    .add-to-cart-count{
        padding: 0 5px;
        min-width: 35px;
        height: 42px;
        border-top: 2px solid rgba(129,129,129,.2);
        border-bottom: 2px solid rgba(129,129,129,.2);
        background: 0 0;
        box-shadow: none;
    }
    .add-to-cart-count-text{
        color: white;
		font-family: 'Poppins' !important;
		font-size: 14px !important;
        margin: 0 auto;
        text-align: center;
        margin-top: 8px;
    }
    .add-to-cart-button{
		background-color: #95d100;
		display: inline-block;
		margin-left: 20px;
		height: 40px;
		width: 190px;
    }
    .add-to-cart-button:hover{
        background-color: #76a530;
    }
    .add-to-cart-text{
        margin: 0 auto;
        color: white;
		font-family: 'Poppins' !important;
		font-size: 14px !important;
    }
    .product-extras-wrapper{
        display: inline;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .product-extras-segment{
        display: flex;

        @media screen and (max-width: 599px){
            padding-left: 25px;
            padding-right: 25px;
        }
    }
    .product-extras-key{
		font-family: 'Poppins' !important;
		font-size: 14px !important;
        color: white;
        font-weight: 600;
    }
    .product-extras-value{
		font-family: 'Poppins' !important;
		font-size: 14px !important;
        color: white;
        font-weight: 300;
        margin-left: 5px;
    }
</style>
