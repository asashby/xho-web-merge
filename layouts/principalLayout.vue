<template>
	<v-app>
		<NavBarComponent class="principal-layout--nav-bar"/>

		<div class="principal-layout--container">
			<div class="content-container">
				<picture>
					<img
						class="login-logo"
						src="~/assets/icons/ximena_logo.svg"
						alt="Logo_Ximena_Hoyos">
				</picture>

				<div v-if="$auth.$state.loggedIn" class="user-greeting--main-container">
					<div class="user-greeting--text">
						<h1>Hola</h1>
						<h2>{{ userName }}</h2>
					</div>
					<NuxtLink to="/perfil">
						<picture>
							<source>
								<img :src="userPhoto" class="user-greeting--avatar">
						</picture>
					</NuxtLink>
				</div>

				<Nuxt />
			</div>
		</div>
	</v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import AppMenu from '~/components/AppMenu/AppMenu'
import NavBarComponent from '~/components/Nav'

export default {
	name: 'LayoutPantallaPrincipal',
	components: { NavBarComponent },
	middleware: 'auth',
	computed: {
		...mapGetters('profile', [
			'userPhoto',
			'userName'
		]),
		...mapState({
			menu: state => state.menu
		}),
		isLoggedIn () {
			return this.$auth.$state.loggedIn
		},
		isNotLoggedIn () {
			return !this.$auth.$state.loggedIn
		}
	},
	methods: {
		logoClick () {
			if (this.isNotLoggedIn) {
				this.$router.push('/inicio-sesion')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.principal-layout {
	&--nav-bar {

		@media screen and (min-width: 1024px) {
			@apply hidden;
		}
	}

	&--container {

		.menu-container {
			@apply hidden;

			@media screen and (min-width: 1024px) {
				@apply block;
				@apply bg-black-darkest;
				@apply rounded-r-3xl;
				@apply pt-12;

				img {
					@apply ml-10 mb-10;
				}
			}
		}

		.content-container {
			display: inline;

			@media screen and (min-width:1024px) {

			}

			.user-greeting {

				&--main-container {
					@apply hidden;

					@media screen and (min-width: 1024px) {
						@apply flex items-center justify-end;
						@apply mb-6 mt-8 mx-auto;
						max-width: $maxWidth;
					}
				}

				&--text {
					@apply text-gray-light;
					@apply mr-4;

					h1 {
						@apply text-2xl font-bold;
					}
				}

				&--avatar {
					@apply w-10 h-10;
					@apply rounded-full;
					@apply border border-solid border-gray-light;
				}
			}
		}
	}
}

.login-logo{

	@media screen and (max-width: 599px) {
		display: none;
	}

	@media screen and (min-width: 600px) {
		margin-top: 35px;
		margin-left: 75px;
		float: left;
		width: 100px;
	}
}

.login-logo:hover{
	cursor: pointer;
}
</style>
