<template>
  <div class="modal-overlay">
    <div class="modal">
      <img class="check" src="~/assets/images/payment/success.png" alt="" />
      <h6>¡Exitoso!</h6>
      <p>El pago se ha realizado correctamente</p>
      <button @click="closeModal">Aceptar</button>
    </div>
    <div class="close">
      <img class="close-img" src="~/assets/icons/close.svg" alt="" />
    </div>
  </div>
</template>
<script>
function closeModal () {
	this.$store.commit('SET_SHOW_PAYMENT_MODAL', false)
	this.$router.push('/entrenamientos')
}

export default {
	methods: {
		closeModal
	}
}
</script>
<style scoped>
    .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    }

    .modal {
    text-align: center;
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
    }
    .close {
    margin: 10% 0 0 16px;
    cursor: pointer;
    }

    .close-img {
        color: white;
        width: 25px;
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
