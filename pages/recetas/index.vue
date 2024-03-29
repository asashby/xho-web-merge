<template>
	<div class="cooking-recipes">
		<div class="cooking-recipes--banner-container">

			<div class="cooking-recipes--banner-container__image">
				<picture>
					<source media="(min-width:600px)" srcset="~/assets/images/recetas/bannerecetas.png" >
					<source media="(min-width:600px)" srcset="~/assets/images/recetas/banner_desktop@2x.jpg 2x" >
					<source srcset="~/assets/images/recetas/banner_movil@2x.jpg 2x" >
					<img
						class="cooking-recipes--banner-container__image-img"
						src="~/assets/images/recetas/banner_movil.jpg"
						alt="imagen banner de cooking-recipes"
					>
				</picture>
			</div>

			<div class="cooking-recipes--banner-container__title">
				<h1>Comidas</h1>
			</div>

			<div v-if="showRecipes" class="cooking-recipes--banner-container__search">
				<MobileButtonSearcher @click="openMobileSearch = true" />
				<SearcherField
					class="cooking-recipes--banner-container__search_desktop"
					@enter="searchRecipe"
				/>
			</div>

		</div>

		<div v-if="showRecipes">
			<div class="cooking-recipes--meals-container">
				<RecipeSelector
					@filter-recipes="filterRecipes"
				/>
			</div>

			<div class="cooking-recipes--content-container" v-if="cookingRecipes && cookingRecipes.length > 0">
				<RecipeComponent
					class="cooking-recipes--content-container__articulo"
					v-for="(recipe, recipeIndex) in cookingRecipes"
					:key="recipeIndex"
					:img="recipe.page_image"
					:resume="recipe.resume"
					:title="recipe.title"
					:id="recipe.id"
					:slug="recipe.slug"
				/>
			</div>
			<h1 v-else class="text-6xl font-bold text-center text-gray-heavy mb-8">Lo siento, no existen resultados :(</h1>

			<div
				v-if="showSeeMoreButton"
				class="cooking-recipes--content-btn__see-more">
				<button
					class="more-button"
					@click="handleClickOnSeeMore"
				>Ver mas +</button>
			</div>

			<v-navigation-drawer
				class="cooking-recipes--sidebar-mobile"
				fixed
				temporary
				width='90%'
				v-model="openMobileSearch"
			>
				<div class="cooking-recipes--sidebar-mobile__search-container">
					<SearcherField
						@enter="searchRecipe"
					/>
				</div>
			</v-navigation-drawer>
		</div>
		<div v-if="!showRecipes" class="content-locked-wrapper">
			<img class="content-locked-icon" src="~/assets/images/recetas/lock.png" alt="bloqueado">
			<p class="content-locked-title">Contenido bloqueado</p>
			<p class="content-locked-subtitle">Necesitas desbloquear un entrenamiento para poder ver las recetas</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getPropertysValue } from 'functionallibrary'
import MobileButtonSearcher from '~/components/Searcher/MobileButtonSearcher'
import SearcherField from '~/components/Searcher/SearcherField'
import RecipeComponent from '~/components/Recipe/RecipeComponent'
import RecipeSelector from '~/components/Recipe/RecipeSelector'

async function filterRecipes (filter) {
	await this.$store.dispatch('recipes/filter', filter)
}

async function searchRecipe (searchValue) {
	const value = searchValue ? searchValue.trim() : null
	await this.$store.dispatch('recipes/setSearch', value)
}

async function handleClickOnSeeMore () {
	await this.$store.dispatch('recipes/changePage')
	await this.$store.dispatch('recipes/getList')
}

async function fetch () {
	await this.$store.dispatch('recipes/getList', true)
	await this.$store.dispatch('recipes/getChallengesCoursePaid')
	console.log(this.$store.state.auth)
}

function data () {
	return {
		openMobileSearch: false
	}
}

export default {
	name: 'PaginaDeRecetas',
	components: {
		MobileButtonSearcher,
		RecipeComponent,
		RecipeSelector,
		SearcherField
	},
	computed: {
		...mapGetters('recipes', [
			'showSeeMoreButton'
		]),
		...mapState('recipes', {
			cookingRecipes: state => getPropertysValue('list', state),
			user: state => state.auth.user,
			showRecipes: state => state.showRecipes
		})
	},
	data,
	fetch,
	methods: {
		filterRecipes,
		handleClickOnSeeMore,
		searchRecipe
	}
}
</script>

<style lang="scss" scoped>
.cooking-recipes {

	&--banner-container {
		@apply relative;
		height: 490px;
		max-height: calc(100vh / 2);

		@media screen and (min-width:768px) {
			height: 223px;
		}

		@media screen and (min-width:1024px) {
			height: 300px;
		}

		@media screen and (min-width:1260px) {
			height: 367px;
		}

		@media screen and (min-width:1440px) {
			height: 420px;
		}

		@media screen and (min-width:1900px) {
			height: 520px;
		}

		@media screen and (min-width:2500px) {
			height: 720px;
		}

		&__title {
			@apply flex items-center justify-center flex-col;
			@apply w-full h-full;
			@apply mx-auto;
			max-width: $maxWidth;

			@media screen and (min-width: 600px) {
				@apply items-start;
			}

			h1 {
				@apply text-gray-light;
				@apply z-0;
				@apply font-black text-5xl;
			}

			div {
				@apply mt-2;
				@apply text-gray-base;
				@apply text-opacity-60;
			}
		}

		&__image {
			@apply absolute inset-0;
			@apply z-0;

			&-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__search {
			top: 90%;
			@apply absolute;
			@apply flex items-center justify-center;
			@apply w-full;
			@apply z-0;
			@apply px-3;

			&_desktop {
				@apply hidden;

				@media screen and (min-width: 600px) {
					@apply flex;
				}
			}
		}
	}

	&--meals-container {
		@apply pt-20 px-2;
		@apply mx-auto;
		max-width: $maxWidth;

		@media screen and (min-width:600px) {
			@apply pt-32 px-4;
			@apply mx-auto;
			max-width: 1240px;
		}
	}

	&--content-container {
		@apply pt-8 pb-20 px-4;
		@apply mx-auto;
		max-width: 1240px;

		&__articulo {
				@apply mb-8;

				&:last-child {
					@apply mb-0;
				}
		}

		@media screen and (min-width: 600px) {
			@apply grid gap-6 flex-wrap;
			@apply items-start justify-start;
			@apply pt-12;
			grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

			&__articulo {
				@apply mb-0 mx-auto;
				@apply w-full;
			}
		}
	}

	&--content-btn__see-more {
		@apply w-full;
		@apply flex items-center justify-center;
		@apply pb-10;
	}

	&--sidebar-mobile {
		@apply bg-black-heavy;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}

		&__search-container {
			@apply pt-10 px-2;
		}
	}
}

.more-button{
	padding: 16px 24px;
	border-radius: 8px;
	border: 2px solid #1583d2;
	color: #b9b7b8;
	font-weight: 600;
}

.more-button:hover{
	background-color: #1583d2;
	color: white;
}

.content-locked-wrapper {
	justify-content: center;
	align-items: center;
	padding: 10px;

	@media screen and (min-width: 600px) {
		margin-top: 50px;
	}
}

.content-locked-icon {
	width: 150px;
	object-fit: contain;
	margin: 0 auto;
}

.content-locked-title {
	color: white;
	font-size: 22px;
	font-weight: 600;
	text-align: center;
	margin-top: 10px;
}

.content-locked-subtitle {
	color: white;
	font-size: 18px;
	text-align: center;
}
</style>
