<template>
  <div>
    <v-dialog max-width="450px">
      <template #activator="{ on }">
        <v-btn x-large class="success btn" dark v-on="on">
          Solicita tu plan
        </v-btn>
      </template>
      <v-card>
        <div class="plans-wrapper">
          <p class="plans-header-text">
            Seleccione el plan de su conveniencia:
          </p>
          <button
            v-for="plan in coursePlans.plansByCourse"
            :key="plan.id"
            type="button"
            class="plans-btn"
            @click="buyPlan(plan)"
          >
            {{ plan.title }}
            <span class="d-block plans-description">
              {{ plan.description }}
            </span>
            <span class="d-block">
              S/{{ plan.price }}
            </span>
          </button>
          <p class="plans-footer-text">
            Al suscribirte aceptas los Términos y Condiciones de XOH
          </p>
        </div>
      </v-card>
    </v-dialog>
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
<!--<script src="https://checkout.culqi.com/js/v3"></script>-->
<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import Vue from 'vue'

import CulqiCheckout from 'vue-culqi-checkout'
import PaymentCompleted from '~/components/Modal/PaymentCompleted'
import PaymentFailed from '~/components/Modal/PaymentFailed'
// import httpClient from '~/plugins/culqiAxios'

/* Culqi.publicKey = 'pk_live_519c60a11816cfdc';
Culqi.settings({
	title: 'Reto Ximena Hoyos',
	currency: 'PEN',
	description: 'Orden',
	amount: 500
}) */

Vue.use(CulqiCheckout, {
	publicKey: 'pk_live_519c60a11816cfdc',
	title: 'Reto Ximena Hoyos',
	currency: 'PEN',
	description: 'Orden',
	amount: 500
})

function data () {
	return {
		showModal: false
	}
}

/* async function suscribeUserToChallenge (slugName) {
	await this.$store.dispatch('challenges/suscribeUserToChallenge', slugName)
} */

export default defineComponent({
	components: {
		PaymentCompleted,
		PaymentFailed
	},
	setup () {

	},
	data,
	computed: {
		...mapState('challenges', {
			coursePlans: state => state.coursePlans,
			challenge: state => state.details,
			showPaymentModal: state => state.showPaymentModal,
			challengeId: state => state.currentChallengeId,
			showPaymentFailedModal: state => state.showPaymentFailedModal
		}),
		slug () {
			return this.$route.params
		}
	},
	methods: {
		async buyPlan (plan) {
			const token = await this.$culqi.openCheckout()
			const body = {
				amount: 500,
				currency_code: 'PEN',
				email: token.email,
				source_id: token.id
			}

			this.$nextTick(() => {
				this.$nuxt.$loading.start()
			})

			this.$store.commit('SET_PAYMENT_MODAL_REDIRECTION_PATH', '/entrenamientos')

			await this.$store.dispatch('createCulqiOrder', body)

			if (this.$store.state.showPaymentFailedModal === false) {
				const { slugRetos } = this.$route.params

				plan.slug.forEach(async (slugName) => {
					await this.$store.dispatch('challenges/suscribeUserToChallenge', slugName)
				})
				console.log('routeParams', slugRetos)
				this.$store.commit('SET_SHOW_PAYMENT_MODAL', true)
			}

			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		}
	}
})
</script>
<style scoped>
.btn {
    @apply w-full;
    display: inline;
    background-color: #151515;
    border: 1px solid #96d502;
    color: #96d502;
    border-radius: 8px;
    padding: 15px;
    font-weight: 600;
    padding: 25px;
    height: 200px;
    text-transform: capitalize;
}

.btn:hover {
    background-color: #96d502;;
    color: white;
}
.plans-wrapper{
    display: inline-block;
    background-color: #151515;
    padding-top: 25px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 25px;

    @media screen and(max-width:599px) {
        padding-top: 25px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 25px;
    }

    @media screen and(min-width:600px) {
    }
}

.plans-header-text{
    text-align: center;
    color: #fff;
    font-size: 20px;
}

.plans-description{
    color: gray;
}

.plans-footer-text{
    margin-top: 25px;
    text-align: center;
    color: gray;
    font-size: 14px;
}
.plans-btn {
    @apply w-full;
    background-color: #151515;
    border: 1px solid #96d502;
    color: #96d502;
    border-radius: 8px;
    padding: 15px;
    font-weight: 600;
    padding: 20px;
    text-transform: capitalize;
    margin-top: 25px;
}

.plans-btn:hover {
    background-color: #96d502;;
    color: white;
}

.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 800000000000000000;
	background: rgba(0, 0, 0, 0.4);
}
</style>
