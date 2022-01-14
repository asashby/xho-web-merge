<template>
  <div class="checkout-data-wrapper">
    <div class="checkout-data-form">
      <div class="checkout-data-form-fields">
        <p class="checkout-data-form-fields-title">
          Facturación y envío
        </p>
        <div class="checkout-data-form-fields-wrapper">
          <p id="checkout-dni-field" class="form-row validation-required">
            <label for="checkout-dni">
              DNI
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-dni" type="text" class="input-text">
            </span>
          </p>
          <p id="checkout-name-field" class="form-row form-row-first validation-required">
            <label for="checkout-name">
              Nombre
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-name" v-model="firstNameData" type="text" class="input-text">
            </span>
          </p>
          <p id="checkout-last-name-field" class="form-row form-row-last validation-required">
            <label for="checkout-last-name">
              Apellidos
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-last-name" v-model="lastNameData" type="text" class="input-text">
            </span>
          </p>
          <p id="checkout-enterprise-field" class="form-row">
            <label for="checkout-enterprise">
              Nombre de la empresa (opcional)
            </label>
            <span>
              <input id="checkout-enterprise" type="text" class="input-text">
            </span>
          </p>
          <p id="checkout-enterprise-field" class="form-row validation-required">
            <label for="checkout-enterprise">
              País
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span class="country-span">
              <strong>Perú</strong>
              <input id="checkout-country" type="hidden" class="country_to_state">
            </span>
          </p>
          <p id="checkout-address-1-field" class="form-row validation-required">
            <label for="checkout-address-1">
              Dirección de la calle
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-address-1" v-model="firstAddressData" type="text" class="input-text" placeholder="Número de la casa y nombre de la calle">
            </span>
          </p>
          <p id="checkout-address-2-field" class="form-row validation-required">
            <span>
              <input id="checkout-address-2" v-model="secondAddressData" type="text" class="input-text" placeholder="Apartamento, habitación, etc. (opcional)">
            </span>
          </p>
          <p id="checkout-department-field" class="form-row">
            <label for="checkout-department">
              Departamento (opcional)
            </label>
            <span>
              <select id="checkout-department" v-model="stateData" class="select-text" name="checkout-department" aria-placeholder="Elige una opción">
                <option class="select-text-option" value="">Elige una opción</option>
                <option class="select-text-option" value="AMA">Amazonas</option>
                <option class="select-text-option" value="ANC">Ancash</option>
                <option class="select-text-option" value="APU">Apurímac</option>
                <option class="select-text-option" value="ARE">Arequipa</option>
                <option class="select-text-option" value="AYA">Ayacucho</option>
                <option class="select-text-option" value="CAJ">Cajamarca</option>
                <option class="select-text-option" value="CUS">Cusco</option>
                <option class="select-text-option" value="CAL">El Callao</option>
                <option class="select-text-option" value="HUV">Huancavelica</option>
                <option class="select-text-option" value="HUC">Huánuco</option>
                <option class="select-text-option" value="ICA">Ica</option>
                <option class="select-text-option" value="JUN">Junín</option>
                <option class="select-text-option" value="LAL">La Libertad</option>
                <option class="select-text-option" value="LAM">Lambayeque</option>
                <option class="select-text-option" value="LIM">Lima</option>
                <option class="select-text-option" value="LOR">Loreto</option>
                <option class="select-text-option" value="MDD">Madre de Dios</option>
                <option class="select-text-option" value="MOQ">Moquegua</option>
                <option class="select-text-option" value="LMA">Municipalidad Metropolitana de Lima</option>
              </select>
            </span>
          </p>
          <p id="checkout-district-field" class="form-row validation-required">
            <label for="checkout-district">
              Distrito
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <select
                id="checkout-district"
                v-model="cityData"
                class="select-text"
                name="checkout-district"
                aria-placeholder="Elige una opción"
              >
                <option class="select-text-option" value="">Elige una opción</option>
                <option v-for="district in districtsData" :key="district.id" class="select-text-option" :value="district.id">{{ district.name }}</option>
              </select>
            </span>
          </p>
          <p id="checkout-phone-field" class="form-row validation-required">
            <label for="checkout-phone">
              Teléfono
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-phone" v-model="phoneData" type="number" class="input-text">
            </span>
          </p>
          <p id="checkout-email-field" class="form-row validation-required">
            <label for="checkout-email">
              Dirección de correo electrónico
              <abbr title="Obligatorio" class="required">*</abbr>
            </label>
            <span>
              <input id="checkout-email" v-model="emailData" type="text" class="input-text">
            </span>
          </p>
        </div>
      </div>
      <div class="checkout-data-form-review">
        <p class="order-review-title">
          Tu pedido
        </p>
        <div class="order-review">
          <div class="woodmart-table-wrapper">
            <table class="review-order-table">
              <thead>
                <tr>
                  <th class="product-name th-border">
                    Producto
                  </th>
                  <th class="product-total th-border">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in $store.state.cart" :key="item.product.id" class="cart-item">
                  <td class="product-name th-border">
                    <p class="product-name-text">
                      {{ item.product.title }} X {{ item.count }}
                    </p>
                  </td>
                  <td class="product-total th-border">
                    <p class="product-total-text">
                      S/{{ item.product.price }}
                    </p>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="cart-subtotal th-border">
                  <th class="cart-subtotal-text">
                    Subtotal
                  </th>
                  <td>
                    <p class="cart-subtotal-amount">
                      S/{{ cartTotal }}
                    </p>
                  </td>
                </tr>
                <tr class="shipping th-border">
                  <th class="shipping-text">
                    Envío
                  </th>
                  <td>
                    <p class="shipping-details">
                      Envío gratuito
                    </p>
                  </td>
                </tr>
                <tr class="order-total">
                  <th class="order-total-text">
                    Total
                  </th>
                  <td>
                    <p class="order-total-amount">
                      S/{{ cartTotal }}
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div id="payment" class="checkout-data-form-payment">
            <div class="payment-methods th-border">
              <div class="payment-methods-media">
                <p class="payment-methods-title">
                  Pago con tarjeta de crédito
                </p>
                <img class="payment-methods-img" src="~/assets/images/shop/credit-cards.png" alt="Tarjetas">
              </div>
              <p class="payment-methods-description">
                Usted ingresará los datos de pago después de la confirmación del pedido
              </p>
            </div>
            <div class="payment-form-footer">
              <p class="payment-form-footer-text">
                Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra
                <NuxtLink class="privacy-policy-text" to="/perfil/politicas-de-privacidad">
                  Política de privacidad
                </NuxtLink>
              </p>
              <button class="realize-order-button" @click="completeOrder">
                <p class="realize-order-text">
                  Realizar el pedido
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="payment-window">
      <div v-if="$store.state.showPaymentModal" class="modal-overlay">
        <PaymentCompleted />
      </div>
      <div v-if="$store.state.showPaymentFailedModal" class="modal-overlay">
        <PaymentFailed />
      </div>
    </transition>
  </div>
</template>
<script src="https://checkout.culqi.com/js/v3"></script>
<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import Vue from 'vue'
import CulqiCheckout from 'vue-culqi-checkout'
import PaymentCompleted from '~/components/Modal/PaymentCompleted'
import PaymentFailed from '~/components/Modal/PaymentFailed'
import districtsData from '@/api/districts'
// import culqiHttpClient from '~/plugins/culqiAxios'

Culqi.publicKey = 'pk_live_519c60a11816cfdc';
Culqi.settings({
    title: 'Tienda Ximena Hoyos',
    currency: 'PEN',
    description: 'Orden',
    amount: 500
})

Vue.use(CulqiCheckout, {
	publicKey: 'pk_live_519c60a11816cfdc',
	title: 'Tienda Ximena Hoyos',
	currency: 'PEN',
	description: 'Orden',
	amount: 500
})

async function completeOrder () {
  const token = await this.$culqi.openCheckout()
	const body = {
		amount: 500,
		currency_code: 'PEN',
		email: token.email,
		source_id: token.id
	}

  this.$store.commit('SET_PAYMENT_MODAL_REDIRECTION_PATH', '/tienda')

	await this.$store.dispatch('createCulqiOrder', body)

  if (this.$store.state.showPaymentFailedModal === false) {
    const userShipping = {
      firstName: this.firstNameData,
      lastName: this.lastNameData,
      firstAddress: this.firstAddressData,
      secondAddress: this.secondAddressData,
      city: this.cityData,
      state: this.stateData,
      country: this.countryData,
      email: this.emailData,
      phone: this.phoneData
    }
    await this.$store.dispatch('setUserShippingInfo', userShipping)
    await this.$store.dispatch('sendShippingInformation')
    this.$store.commit('SET_SHOW_PAYMENT_MODAL', true)
  }
}

export default defineComponent({
	name: 'ShopCheckout',
	setup () {

	},
	components: {
		PaymentCompleted,
    PaymentFailed
	},
	data () {
		return {
			firstNameData: '',
			lastNameData: '',
			firstAddressData: '',
			secondAddressData: '',
			cityData: '',
			stateData: '',
			countryData: 'PE',
			emailData: '',
			phoneData: ''
		}
	},
	computed: {
		...mapState('challenges', {
			showPaymentModal: state => state.showPaymentModal
		}),
		cart () {
			return this.$store.state.cart
		},
		cartTotal () {
			let total = 0
			this.cart.forEach((value, index) => {
				total = total + value.product.price
			})
			return total
		},
		districtsData () {
			return districtsData
		},
	},
	methods: {
		completeOrder
	}
})
</script>
<style scoped>
    .checkout-data-wrapper{
        @media screen and (max-width: 599px){
          padding-top: 75px;
          padding-left: 20px;
          padding-right: 20px;
        }

        @media screen and (min-width: 600px){
          padding: 75px;
        }
    }
    .checkout-data-form-fields{

        @media screen and (max-width: 599px){
          width: 100%;
        }

        @media screen and (min-width: 600px){
          width: 50%;
          float: left;
        }
    }
    .checkout-data-form-fields-title{
        color: white;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 600;
    }
    .checkout-data-form-fields-wrapper{
        display: block;
    }
    .form-row {
        color: white;
    }
    .form-row-first {
        width: 48%;
        float: left;
    }
    .form-row-last {
        width: 48%;
        float: right;
    }
    .required {
        color: #0d7dc9;
        font-size: 16px;
        line-height: 1;
    }
    .country-span{
        display: flex;
    }
    .input-text{
        color: white;
        padding: 0 15px;
        width: 100%;
        max-width: 100%;
        height: 42px;
        border: 2px solid white;
        background-color: transparent;
        vertical-align: middle;
        font-size: 14px;
        transition: border-color .5s ease;
    }
    .select-text{
        color: white;
        cursor: pointer;
        padding: 0 15px;
        width: 100%;
        max-width: 100%;
        height: 42px;
        border: 2px solid white;
        background-color: transparent;
        vertical-align: middle;
        font-size: 14px;
        transition: border-color .5s ease;
    }
    .select-text-option{
        background-color: #242424;
    }
    .checkout-data-form-review{

        @media screen and (max-width: 599px){
          margin-top: 40px;
          width: 100%;
        }

        @media screen and (min-width: 600px){
          width: 50%;
          float: right;
          padding-left: 75px;
        }
    }
    .order-review-title{
        color: white;
        font-size: 20px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
    }
    .woodmart-table-wrapper{
        margin-bottom: 20px;
        padding: 5px 15px;
        background-color: transparent;
        box-shadow: 1px 1px 2px rgb(0 0 0 / 5%);
    }
    .review-order-table{
        background-color: #3a3a3a;
        width: 100%;
        font-size: 14px;
        line-height: 1.4;
    }
    .product-name{
        padding: 15px 12px;
        color: white;
        text-align: left;
        font-size: 18px;
        text-transform: uppercase;
        max-width: 50%;
        width: 50%;
    }
    .product-total{
        padding: 15px 12px;
        color: white;
        text-align: right;
        font-size: 18px;
        text-transform: uppercase;
        max-width: 50%;
        width: 50%;
    }
    .th-border{
        border-bottom: 1px solid #95d100;
    }
    .product-name-text{
        color: white;
        font-size: 14px;
    }
    .product-total-text{
        color: white;
        font-size: 14px;
    }
    .cart-subtotal-text{
        padding: 15px 12px;
        color: white;
        font-size: 14px;
        text-align: left;
    }
    .cart-subtotal-amount{
        padding: 15px 12px;
        font-size: 14px;
        color: #55b2f4;
        text-align: right;
        margin: 0 auto;
    }
    .shipping-text{
        padding: 15px 12px;
        color: white;
        font-size: 14px;
        text-align: left;
    }
    .shipping-details{
        padding: 15px 12px;
        font-size: 12px;
        color: white;
        text-align: right;
        margin: 0 auto;
    }
    .order-total-text{
        padding: 15px 12px;
        color: white;
        font-size: 18px;
        text-align: left;
    }
    .order-total-amount{
        padding: 15px 12px;
        font-size: 20px;
        color: #55b2f4;
        text-align: right;
        margin: 0 auto;
    }
    .payment-methods{
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 20px;
        line-height: 1.4;
    }
    .payment-methods-media{
        display: flex;
    }
    .payment-methods-title{
        color: white;
        font-size: 14px;
    }
    .payment-methods-img{
        object-fit: contain;
        width: 75px;
        margin-left: 15px;
    }
    .payment-methods-description{
        color: white;
        font-size: 14px;
    }
    .payment-form-footer{
        padding: 15px 12px;
    }
    .payment-form-footer-text{
        color: white;
        font-size: 14px;
    }
    .privacy-policy-text{
        color: rgb(165, 164, 164);
        font-size: 14px;
    }
    .privacy-policy-text:hover{
        cursor: pointer;
    }
    .realize-order-button{
		background-color: #95d100;
		display: inline-block;
		height: 40px;
		width: 100%;
    }
    .realize-order-button:hover{
        background-color: #76a530;
        cursor: pointer !important;
    }
    .realize-order-text{
        margin: 0 auto;
        color: white;
		font-family: 'Poppins' !important;
		font-size: 14px !important;
        text-transform: uppercase;
    }
</style>
