<template>
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
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import Vue from 'vue'

import CulqiCheckout from 'vue-culqi-checkout'
// import httpClient from '~/plugins/culqiAxios'

Vue.use(CulqiCheckout, {
	publicKey: 'pk_test_vzMuTHoueOMlgUPj',
	title: 'Compra ',
	currency: 'PEN',
	description: 'Descripcion',
	amount: 1000
})

export default defineComponent({
	setup () {

	},
	computed: {
		...mapState('challenges', {
			coursePlans: state => state.coursePlans,
			challenge: state => state.details
		}),
		slug () {
			return this.$route.params
		}
	},
	methods: {
		async buyPlan (plan) {
			try {
				const token = await this.$culqi.openCheckout()
				console.log(token)
			} catch (ex) {
				console.log('no se pudo')
			}

			const { slugRetos } = this.$route.params
			await this.$store.dispatch('challenges/suscribeUserToChallenge', slugRetos)
			console.log('routeParams', slugRetos)

			/* const body = {
				amount: plan.price,
				currency_code: 'PEN',
				email: 'test@gmail.com',
				source_id: token
			} */

			/* const response = await httpClient({
				url: '/charges',
				method: 'post',
				headers: {
					// "X-CSRF-TOKEN": getCookie('csrf_token')
				},
				data: body
			}) */
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
</style>
