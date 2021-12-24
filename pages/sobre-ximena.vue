<template>
  <div class="principal--main-container">
    <section class="principal-background--container">
      <picture>
        <source
          media="(min-width: 960px)"
          srcset="~/assets/images/menu/ximena-hoyos2.jpg"
        >
        <source :srcset="bannerMobileImage">
        <img :src="bannerMobileImage" class="principal-background--container-img">
      </picture>

      <div class="principal-background--container-rrss">
        <div class="name-container">
          <h1 class="ximena-name-dark">Ximena</h1>
          <h1 class="ximena-name-dark">Hoyos</h1>
        </div>

        <div class="principal-background--container-rrss_components">
          <a :href="facebookLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/facebook.webp">
          </a>
          <a :href="instagramLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/instagram.webp">
          </a>
          <a :href="tiktokLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/tiktok.webp">
          </a>
        </div>
      </div>
    </section>

    <section class="principal-ximena--container">
      <div class="principal-ximena--container-rrss">
        <a :href="facebookLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/facebook.webp">
        </a>
        <a :href="instagramLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/instagram.webp">
        </a>
        <a :href="tiktokLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/tiktok.webp">
        </a>
      </div>

      <div class="principal-ximena--container-name">
        <h1 class="ximena-name">Ximena</h1>
        <h1 class="ximena-name">Hoyos</h1>
      </div>
      <div class="principal-ximena--container-div-summary">
		<div class="principal-ximena--container-summary">
					<div class="principal-ximena--container-summary_content">
						<picture>
							<img :src="ximenaCircular" class="principal-ximena--container-summary_avatar">
						</picture>
					</div>
			<p
			class="principal-ximena--container-summary_personal-info"
			v-html="description"
			/>
		</div>
		<div class="principal-ximena--container-access-menu">
			<div class="principal-ximena--container-op1">
				<NuxtLink to="/sobre-ximena">
					<picture>
						<img
							class="login-card"
							src="~/assets/images/login/OP01.jpg"
							alt="Logo_Ximena_Hoyos"
						>
					</picture>
				</NuxtLink>
			</div>
			<div class="principal-ximena--container-op2">
				<NuxtLink to="/entrenamientos">
					<picture>
						<img
						class="login-card"
						src="~/assets/images/login/OP02.jpg"
						alt="Logo_Ximena_Hoyos"
						>
					</picture>
				</NuxtLink>
			</div>
			<div class="principal-ximena--container-op3">
				<NuxtLink to="/recetas">
					<picture>
						<img
						class="login-card"
						src="~/assets/images/login/OP03.jpg"
						alt="Logo_Ximena_Hoyos"
						>
					</picture>
				</NuxtLink>
			</div>
			<div class="principal-ximena--container-op4">
				<NuxtLink to="/tips">
					<picture>
						<img
						class="login-card"
						src="~/assets/images/login/OP04.jpg"
						alt="Logo_Ximena_Hoyos"
						>
					</picture>
				</NuxtLink>
			</div>
		</div>
      </div>
    </section>

    <section class="principal-images--container">
      <img
        v-for="pride in prideImages"
        :key="pride"
        :src="pride"
      >
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPropertysValue } from 'functionallibrary'

function mounted () {
	this.$nextTick(() => {
		this.$nuxt.$loading.start()
		setTimeout(() => this.$nuxt.$loading.finish(), 1000)
	})
}

function rrssImages () {
	return {
		facebook: '~/assets/images/ximena/facebook.webp',
		instagram: '~/assets/images/ximena/instagram.webp',
		tiktok: '~/assets/images/ximena/tiktok.webp'
	}
}

async function fetch () {
	await this.$store.dispatch('getXimenaData')
}

export default {
	name: 'PaginaSobreXimena',
	auth: false,
	layout: 'principalLayout',
	fetch,
	computed: {
		...mapState({
			bannerImage: state => getPropertysValue('ximena.banner', state),
			bannerMobileImage: state => getPropertysValue('ximena.mobile_image', state),
			description: state => getPropertysValue('ximena.description', state),
			facebookLink: state => getPropertysValue('ximena.addittional_info.facebook', state),
			instagramLink: state => getPropertysValue('ximena.addittional_info.instagram', state),
			prideImages: state => getPropertysValue('ximena.galery', state),
			tiktokLink: state => getPropertysValue('ximena.addittional_info.tiktok', state),
			ximenaCircular: state => getPropertysValue('ximena.page_image', state)
		}),
		rrssImages
	},
	methods: {
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
		}
	},
	mounted
}
</script>

<style lang="scss" scoped>
.principal--main-container {
	width: 100%;

	@media screen and (min-width: 600px) {
		padding-left: 150px;
		padding-right: 150px;
	}

	.principal-background--container {
		@apply bg-gray-heavy;
		@apply w-full;
		@apply relative;
		@apply overflow-hidden;
		max-height: calc(100vh / 1.85);
		height: 360px;

		@media screen and (min-width:1024px) {
			@apply rounded-2xl;
			height: 210px;
		}

		&-img {
			@apply w-full h-full;
			@apply object-cover object-top;
		}

		&-rrss {
			@apply hidden;

			&_components {
				@media screen and (max-width:599px) {
					float: right;
				}
				.rrss-component {

					img {
					}
				}
			}

			@media screen and (min-width: 600px) {
				@apply absolute right-0 z-10;
				@apply w-full;
				@apply flex justify-between items-center;
				@apply pr-8 pl-16;
				bottom: 30%;

				.name-container {
					@apply text-gray-light;

					h1 {
						@apply text-2xl font-bold;
					}

				}

				&_components {
					@apply flex;

					.rrss-component {
						@apply rounded w-full h-full;
						margin: 0px -5px;

						img {
							@apply w-full h-full;
						}
					}
				}
			}
		}

	}

	.principal-ximena--container {
		@apply text-gray-light;
		width: 100%;

		&-div-summary{
			align-items: center;
			max-width: 100%;

			@media screen and (max-width: 599px) {
				display: inline;
			}

			@media screen and (min-width: 600px) {
				display: inline-flex;
			}
		}

		@media screen and (min-width: 960px) {
		}

		&-rrss {
			@apply absolute;
			@apply w-full;
			@apply flex items-center justify-center;
			@apply z-10;
			bottom: 96%;

			@media screen and (min-width: 600px) {
				@apply hidden;
			}

			.rrss-component {
				height: 40px !important;
				width: 40px !important;
				@apply rounded;

				img {
					height: 40px !important;
					width: 40px !important;
				}
			}
		}

		&-name {
			@apply text-center;

			@media screen and (max-width: 599px) {
				margin-top: 25px;
			}

			@media screen and (min-width: 960px) {
				@apply hidden;
			}

			h1 {
				@apply text-2xl font-bold;
			}
		}

		&-summary {
			align-items: center;
			margin: 0 auto;
			max-width: 100%;

			@media screen and (max-width: 599px) {
				display: inline;
				padding: 30px;
			}

			@media screen and (min-width: 600px) {
				display: flex;
				text-align: left;
				width: 50%;
				@apply pt-8 px-4 pb-4 mt-6 mb-8;
				border: 3px solid #90d701;
				@apply rounded-2xl;
			}

			&_avatar {
				@apply bg-gray-base;
				@apply rounded-full;
				@apply object-cover;

				@media screen and (max-width: 959px) {
					display: none;
				}

				@media screen and (min-width: 960px) {
					height: 250px;
					width: 250px;
				}
			}

			&_personal-info {
				color: white;
				font-size: 14px;
				align-content: center;
				margin: 0 auto;

				@media screen and (max-width: 599px) {
					padding-left: 30px;
					padding-right: 30px;
				}

				@media screen and (min-width: 600px) {
					max-width: 49%;
					padding-left: 15px;
				}
			}
		}

		&-access-menu{
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			@media screen and (min-width: 600px) {
				grid-auto-rows: minmax(100px, auto);
				width: 500px;
			}
		}

		&-op1{
			grid-column: 1;
			grid-row: 1;
		}

		&-op2{
			grid-column: 2;
			grid-row: 1;
		}

		&-op3{
			grid-column: 1;
			grid-row: 2;
		}

		&-op4{
			grid-column: 2;
			grid-row: 2;
		}
	}

	.principal-images--container {
		@apply grid gap-2;
		@apply px-2;

		@media screen and (min-width: 600px) {
			@apply grid-cols-2;
		}

		@media screen and (min-width:1024px) {
			@apply mx-auto;
			max-width: 632px;
		}

		img {
			@apply bg-red-base;
			@apply rounded-xl;
			@apply w-full h-40;
		}
	}
}

.ximena-name{
	color: #55b2f4;
}
.ximena-name-dark{
	color: #0d7dc9;
}

.login-card{
	@media screen and (max-width: 599px) {
		height: 150px;
	}
}

.login-card:hover{
	opacity: 0.7;
	cursor: pointer;
}
</style>
