<template>
  <div class="login-main-container">
    <!-- contenedor para imagen de fondo -->
    <div class="login-background-image-container">
      <picture>
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/new_background.webp"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/new_background.webp 1.5x"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/new_background.webp 2x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/login/new_background.webp 1.5x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/login/new_background.webp 2x"
        >
        <img
          class="login-background-image"
          src="~/assets/images/login/new_background.webp"
        >
      </picture>
    </div>
    <div class="login-wrapper">
      <div class="login-middle">
        <div class="login-row">
          <div class="login-column">
            <picture>
              <img
                class="login-cover"
                src="~/assets/images/login/ximena.png"
                alt="Logo_Ximena_Hoyos"
              >
            </picture>
          </div>
          <div class="login-column">
            <div>
              <p class="login-title-text">
                El app incluye: V0.0.1
              </p>
            </div>
            <div class="login-grid">
              <div class="login-op1">
                <picture>
                  <img
                    class="login-card"
                    src="~/assets/images/login/OP01.jpg"
                    alt="Logo_Ximena_Hoyos"
                  >
                </picture>
              </div>
              <div class="login-op2">
                <picture>
                  <img
                    class="login-card"
                    src="~/assets/images/login/OP02.jpg"
                    alt="Logo_Ximena_Hoyos"
                  >
                </picture>
              </div>
              <div class="login-op3">
                <picture>
                  <img
                    class="login-card"
                    src="~/assets/images/login/OP03.jpg"
                    alt="Logo_Ximena_Hoyos"
                  >
                </picture>
              </div>
              <div class="login-op4">
                <picture>
                  <img
                    class="login-card"
                    src="~/assets/images/login/OP04.jpg"
                    alt="Logo_Ximena_Hoyos"
                  >
                </picture>
              </div>
            </div>
            <div class="login-social-selector">
              <div class="login-selector-grid">
                <button
                  type="button"
                  class="login-facebook"
                  @click="setFacebookProvider"
                >
                  <picture>
                    <img
                      class="login-selector-icon"
                      src="~/assets/icons/facebook.svg"
                      alt="facebook"
                    >
                  </picture>
                </button>
                <button
                  type="button"
                  class="login-google"
                  @click="setGoogleProvider"
                >
                  <picture>
                    <img
                      class="login-selector-icon"
                      src="~/assets/icons/google.svg"
                      alt="google"
                    >
                  </picture>
                </button>
              </div>
              <button
                type="button"
                class="login-enter-button"
                @click="signIn"
              >
                <p class="login-enter-text-button">
                  ENTRAR
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-tabs */
import { compose, getPropertysValue, setNewProperty } from 'functionallibrary'
import { mapActions, mapGetters } from 'vuex'
// import VueToggleImage from '@ivahid/vue-toggle-image'
import '@ivahid/vue-toggle-image/dist/vue-toggle-image.css'
// import firebase from 'firebase'
// import FacebookButton from '~/components/Buttons/Facebook.button'
// import GoogleButton from '~/components/Buttons/Google.button'

export default {
	name: 'PaginaInicioSesion',
	auth: false,
	layout: 'headless',
	data: () => ({
		userData: {
			name: '',
			last_name: '',
			email: '',
			image: '',
			password: '',
			origin: ''
		}
	}),
	computed: {
		...mapGetters([
			'isGoogle',
			'isFacebook'
		])
	},
	async mounted () {
		// Dejo esto como ayuda para que puedan revisar el objeto con toda la info
		// del provider
		// console.log('AUTH NUXT INFO', this.$auth)
		this.$nextTick(() => {
			this.$nuxt.$loading.start()
		})
		if (this.$auth.$state.loggedIn) {
			this.$router.push('/perfil')
			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		} else {
			await this.checkLoginWithProviders()
		}
	},
	methods: {
		...mapActions([
			'logout'
		]),
		async checkLoginWithProviders () {
			if (location) {
				const hash = new URLSearchParams(location.hash)
				console.log('______________________________ \t -> checkLoginWithProviders \t')
				console.log({ location, hash, isFacebook: this.isFacebook, isGoogle: this.isGoogle })
				console.log('______________________________')
				if (hash && this.isFacebook) {
					await this.loginWithFacebook(hash)
				} else if (hash && this.isGoogle) {
					await this.loginWithGoogle(hash)
				} else {
					this.$nextTick(() => {
						this.$nuxt.$loading.finish()
					})
				}
			} else {
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
			}
		},
		loginWithFacebook (hash) {
			const facebookToken = hash.get('#access_token')
			if (facebookToken) {
				this.$router.push('/objetivos')
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
			} else {
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
				console.log('No hay token de facebook')
			}
		},
		loginWithGoogle () {
			this.$router.push('/objetivos')
			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		},
		updateUserData (newUserData) {
			if (this.isFacebook) {
				this.userData = this.updateUserDataFromFacebook(newUserData)
			}
		},
		updateUserDataFromFacebook (facebookData) {
			const userImage = getPropertysValue('picture.data.url', facebookData)
			console.log('__________________________________ \t -> updateUserDataFromFacebook \t')
			console.log({
				name: facebookData.name,
				last_name: facebookData.lastname,
				password: window.btoa(facebookData.id),
				image: userImage,
				email: facebookData.email,
				origin: 'Facebook'
			})
			console.log('__________________________________')
			return compose(
				setNewProperty('name', facebookData.name),
				setNewProperty('last_name', facebookData.lastname),
				setNewProperty('password', window.btoa(facebookData.id)),
				setNewProperty('image', userImage),
				setNewProperty('email', facebookData.email),
				setNewProperty('origin', 'Facebook')
			)({})
		},
		goToAbout () {
			this.$router.push('/sobre-ximena')
		},
		goToTraining () {
			this.$router.push('/entrenamientos')
		},
		goToRecipes () {
			this.$router.push('/recetas')
		},
		goToTips () {
			this.$router.push('/tips')
		},
		async signIn () {
			await this.$auth.loginWith(this.$store.state.loginButtonProvider)
		},
		setGoogleProvider () {
			this.$store.commit('SET_LOGIN_BUTTON_PROVIDER', 'google')
		},
		setFacebookProvider () {
			this.$store.commit('SET_LOGIN_BUTTON_PROVIDER', 'facebook')
		}
		/* googleSignIn () {
			this.provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithPopup(this.provider).then((result) => {
				this.$router.push('/perfil')
			}).catch((e) => {
				this.$notify.error(e.message)
				console.log(e)
			})
		} */
	}
}
</script>

<style lang="scss">
  .login {
    &-main-container {
      @apply text-gray-light;
      @apply flex;
      @apply px-3;
      @apply h-screen;

      @media screen and (min-width: 600px) {
        @apply items-center justify-center;
      }
    }

	&-background-image-container {
		@apply absolute inset-0 z-0;
	}

	&-background-image {
		@apply w-full h-full;
		@apply object-cover;
	}

	&-wrapper {
		@apply w-full;
		@apply z-10;
		@apply pb-4;
		margin: 0 auto;
		align-items: center;

		@media screen and (max-width: 599px) {
			display: table;
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
		}

		@media screen and (min-width: 600px) {
			@apply self-auto;
			display: table;
			align-items: center;
		}
	}
	&-title-text{

		@media screen and (max-width: 599px) {
			display: none;
		}
		@media screen and (min-width: 600px) {
			text-align: center;
			font-size: 18px;
			color: white;
			text-transform: uppercase;
			margin-top: 150px;
		}
	}
	&-middle {
		width: 100%;
		@media screen and (max-width: 599px) {
			display: table-cell;
			vertical-align: middle;
		}
	}
	&-row {
		align-items: center;

		@media screen and (max-width: 599px) {
			margin-left: auto;
			margin-right: auto;
		}
		@media screen and (min-width: 600px) {
			width: 100%;
			display: table;
			clear: both;
		}
	}

	&-column {
		margin: 0 auto;

		@media screen and (max-width: 599px) {
			align-items: center;
			vertical-align: middle;
		}

		@media screen and (min-width: 600px) {
			float: left;
			width: 50%;
		}
	}

	&-logo {
		@apply h-16;
		@apply m-auto mb-6;
	}

	&-cover {
		object-fit: contain;
		margin: 0 auto;

		@media screen and (max-width: 599px) {
			height: 450px;
		}
		@media screen and (max-width: 1099px) and (min-width: 600px) {
			height: 500px;
			float: right;
		}
		@media screen and (min-width: 1100px) {
			height: 700px;
			float: right;
		}
	}

	&-grid {
		display: none;

		@media screen and (max-width: 599px) {
			display: none;
		}

		@media screen and (max-width: 1099px) and (min-width: 600px) {
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: minmax(100px, auto);
			width: 500px;
		}
		@media screen and (min-width: 1100px) {
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: minmax(100px, auto);
			width: 500px;
		}
	}

	&-op1 {
		grid-column: 1;
		grid-row: 1;
	}

	&-op2 {
		grid-column: 2;
		grid-row: 1;
	}

	&-op3 {
		grid-column: 1;
		grid-row: 2;
	}

	&-op4 {
		grid-column: 2;
		grid-row: 2;
	}

	&-card {
		@media screen and (max-width: 599px) {
			height: 150px;
		}
		@media screen and (min-width: 600px) {
			height: 200px;
		}
	}

	&-selector-icon {
		height: 30px;
	}

	&-social-selector {
		margin: 0 auto;
		flex-direction: row;
		display: flex;
		justify-content: center;
		@media screen and (min-width: 600px) {
			width: 400px;
		}
	}

	&-selector-grid {
		align-items: center;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: minmax(50px, auto);
		width: 125px;
		border-radius: 22px;
		background-color: #242424;
		padding: 5px;
		margin: 0 auto;
	}

	&-selector-grid:hover {
		cursor: pointer;
	}

	&-facebook {
		margin: 0 auto;
		border-radius: 20px;
		padding: 10px;
	}
	&-facebook:focus {
		background-color: #93e600;
	}

	&-google {
		padding: 10px;
		margin: 0 auto;
		border-radius: 10px;
	}

	&-google:focus {
		background-color: #93e600;
	}

	&-enter-button {
		@apply w-full;
		@apply flex justify-around items-center;
		@apply text-gray-base;
		@apply bg-gray-light;
		@apply rounded-lg;
		@apply py-4 px-4 mb-4;
		background-color: #93e600;
		display: inline-block;
		margin-left: 25px;
		height: 50px;
		width: 150px;
		border-radius: 22px;
		margin: 0 auto;
	}

	&-enter-text-button {
		@apply text-gray-heavy font-bold;
		font-family: 'Poppins' !important;
		font-size: 18px !important;
		margin-bottom: 0px !important;
		color: #242424;
	}

	&-container-form {
		@apply bg-black-base;
		@apply rounded-3xl;
		@apply pt-10 px-10 pb-8;
		float: right;

		.rrss-btns--container {
			@apply grid gap-4;
		}

		.terms-and-conditions {
			@apply text-center;
			@apply w-full;
			@apply text-gray-heavy;
		}

		.bottom-bar {
			@apply w-32 h-1;
			@apply bg-gray-heavy bg-opacity-25;
			@apply rounded-full;
			@apply mx-auto mt-4;
		}
	}

	&-header-title {
		@apply flex justify-center;
		@apply text-lg font-bold;
		@apply mb-6;
	}
}
</style>
