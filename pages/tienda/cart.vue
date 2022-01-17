<template>
    <div class="cart-wrapper">
        <div class="cart-table-section">
            <p class="cart-table-title">Carrito de compras</p>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th class="product-th">
                        </th>
                        <th class="product-th">
                        </th>
                        <th class="product-th">
                            Producto
                        </th>
                        <th class="product-th">
                            Precio
                        </th>
                        <th class="product-th">
                            Cantidad
                        </th>
                        <th class="product-th">
                            Subtotal
                        </th>
                    </tr>
                </thead>
                <tbody v-for="item in $store.state.cart" :key="item.product.id">
                    <tr>
                        <td class="product-remove">
                            <p class="product-remove-text" @click="$store.commit('removeFromCart', item)">
                                X
                            </p>
                        </td>
                        <td class="product-thumbnail">
                            <img class="product-thumbnail-image" :src="item.product.images[0].src">
                        </td>
                        <td class="product-name">
                            <p class="product-name-text">
                                {{item.product.name}}
                            </p>
                        </td>
                        <td class="product-price">
                            <p class="product-price-text">
                                S/{{item.product.price}}
                            </p>
                        </td>
                        <td class="product-quantity">
                            <p class="product-quantity-text">
                                {{item.quantity}}
                            </p>
                        </td>
                        <td class="product-subtotal">
                            <p class="product-subtotal-text">
                                S/{{item.product.price * item.quantity}}
                            </p>
                        </td>
                    </tr>
                </tbody>
                <tbody></tbody>
            </table>
        </div>
        <div class="cart-totals-section">
            <div class="cart-totals">
                <div class="cart-totals-inner">
                    <h2 class="cart-totals-title">
                        Total del carrito
                    </h2>
                    <table class="cell-spacing">
                        <tbody>
                            <tr class="cart-subtotal">
                                <th class="cart-total-th">
                                    Subtotal
                                </th>
                                <td class="cart-total-td">
                                    S/{{cartTotal}}
                                </td>
                            </tr>
                            <tr class="order-total">
                                <th class="order-total-th">
                                    Total
                                </th>
                                <td class="order-total-td">
                                    S/{{cartTotal}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="finalize-order-button" @click="finishShopping">
                        <p class="finalize-order-text">
                            FINALIZAR COMPRA
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ShopCart',
	computed: {
		cart () {
			return this.$store.state.cart
		},
		cartTotal () {
			let total = 0
			this.cart.forEach((value, index) => {
				total = total + (parseFloat(value.product.price) * value.quantity)
			})
			return total
		}
	},
	methods: {
		removeProductFromCart (product) {
			this.$store.commit('removeFromCart', product)
		},
		finishShopping () {
			this.$router.push('/tienda/checkout')
			/* const token = await this.$culqi.openCheckout()
			console.log(token.id) */
		}
	},
	setup () {

	}
})
</script>
<style scoped>
    .cart-wrapper{
        width: 100%;
        max-width: 100%;

        @media screen and (max-width: 599px) {
            display: inline;
        }

        @media screen and (min-width: 600px) {
            display: flex;
        }
    }
    .cart-table-section{
        margin-top: 100px;
        max-width: 100%;
        width: 100%;

        @media screen and (min-width: 600px) {
            display: inline;
            padding-left: 50px;
            padding-right: 25px;
        }
    }
    .cart-table-title{
        color: white;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 600;
    }
    .cart-table{
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 14px;
        line-height: 1.4;

        @media screen and (max-width: 599px) {
            display: block;
            margin-top: 100px;
        }
    }
    .product-remove{
        border: none;
        border-bottom: 1px solid #E6E6E6;
        padding: 0;
        vertical-align: middle;
        font-size: 100%;
        color: white;

        @media screen and (max-width: 599px) {
            top: -7px;
            right: -7px;
        }
    }
    .product-remove-text{
        margin: 0 auto;
        text-align: center;
    }
    .product-remove-text:hover{
        cursor: pointer;
    }
    .product-thumbnail{
        border: none;
        border-bottom: 1px solid #EFEFEF;
        color: white;
        height: 80px;
        width: 80px;

        @media screen and (max-width: 599px) {
            top: 0;
            left: 0;
            max-height: 115px;
            padding: 15px 10px;
        }

        @media screen and (min-width: 600px) {
            padding: 15px 10px;
        }
    }
    .product-thumbnail-image{
        height: 80px;
        width: 80px;
        border-radius: 6px;
        object-fit: cover;
    }
    .product-name{
        padding: 15px 10px;
        border: none;
        border-bottom: 1px solid #EFEFEF;
        color: white;
    }
    .product-name-text{
        text-align: left;
        font-size: 12px;
        color: white;
    }
    .product-price{
        padding: 15px 10px;
        border: none;
        border-bottom: 1px solid #EFEFEF;
        color: white;
    }
    .product-price-text{
        font-size: 14px;
        color: white;
        font-weight: 300;
    }
    .product-quantity{
        padding: 15px 10px;
        border: none;
        border-bottom: 1px solid #EFEFEF;
        color: white;
    }
    .product-quantity-text{
        font-size: 14px;
        color: white;
        font-weight: 300;
    }
    .product-subtotal{
        padding: 15px 10px;
        border: none;
        border-bottom: 1px solid #EFEFEF;
        color: white;
    }
    .product-subtotal-text{
        font-size: 18px;
        color: #50d2d4;
    }
    .product-th{
        padding: 15px 10px;
        border: none;
        border-bottom: 2px solid #EFEFEF;
        color: white;
        vertical-align: middle;
        text-align: left;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.2;

        @media screen and (max-width: 599px) {
            display: none;
        }
    }
    .cart-totals-section{

        @media screen and (max-width: 599px) {
            margin-top: 50px;
            width: 100%;
            padding-left: 25px;
            padding-right: 25px;
        }

        @media screen and (min-width: 600px) {
            margin-top: 100px;
            width: 700px;
            padding-left: 25px;
            padding-right: 50px;
        }
    }
    .cart-totals-inner{
        padding: 25px;
        border: 3px solid #EFEFEF;
    }
    .cart-totals-title{
        text-transform: uppercase;
        font-weight: 600;
        font-size: 20px;
        color: white;
    }
    .cart-total-th{
        border-bottom: 1px solid #E6E6E6;
        text-transform: none;
        font-size: 14px;
        color: white;
    }
    .cart-total-td{
        vertical-align: middle;
        text-align: right;
        padding: 15px 12px;
        border: none;
        border-bottom: 1px solid #E6E6E6;
        color: white;
        width: 100%;
    }
    .order-total-th{
        text-transform: none;
        font-size: 18px;
        color: white;
    }
    .order-total-td{
        vertical-align: middle;
        text-align: right;
        padding: 15px 12px;
        border: none;
        color: #50d2d4;
        width: 100%;
        font-size: 22px;
    }
    .finalize-order-button{
		background-color: #95d100;
		display: inline-block;
		height: 40px;
		width: 100%;
    }
    .finalize-order-button:hover{
        background-color: #76a530;
        cursor: pointer !important;
    }
    .finalize-order-text{
        margin: 0 auto;
        color: white;
		font-family: 'Poppins' !important;
		font-size: 14px !important;
    }
</style>
