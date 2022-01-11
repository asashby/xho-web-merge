<template>
  <div class="modal-overlay">
    <div class="modal">
      <img class="check" src="~/assets/images/payment/success.png" alt="" />
      <h6>¡Exitoso!</h6>
      <p>El pago se ha realizado correctamente</p>
      <button @click="closeModal">Aceptar</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

function closeModal () {
	this.$store.commit('SET_SHOW_PAYMENT_MODAL', false)
	this.$router.push(this.paymentModalRedirectionPath)
}

export default {
	computed: {
		...mapState({
			paymentModalRedirectionPath: state => state.paymentModalRedirectionPath
		})
	},
	methods: {
		closeModal
	}
}
</script>
<style scoped>
    .modal-overlay {
      display: flex;
      justify-content: center;
      background-color: #000000da;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .modal {
      text-align: center;
      background-color: white;
      border-radius: 20px;

      @media screen and (max-width: 599px){
        padding: 20px 0;
        margin-top: 25%;
        width: 80%;
        height: 500px;
      }

      @media screen and (min-width: 600px){
        padding: 60px 0;
        width: 500px;
        margin-top: 10%;
        height: 500px;
      }
    }

    .check {
        width: 150px;
        margin: 0 auto;
    }

    h6 {
      font-weight: 500;
      font-size: 28px;
      margin: 20px 0;
    }

    p {
      font-size: 16px;
      margin: 20px 0;
    }

    button {
      background-color: #95d100;
      width: 150px;
      height: 40px;
      color: white;
      font-size: 14px;
      border-radius: 16px;
      margin-top: 50px;
    }
</style>
