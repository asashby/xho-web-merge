<template>
  <div class="tips">
    <div class="tips--banner-container">
      <div class="tips--banner-container__title">
        <h1>{{title}}</h1>
        <div v-html="description" />
      </div>

      <div class="tips--banner-container__image">
        <picture class="banner-container">
          <source
            class="banner-image"
            srcset="~/assets/images/tips/bannertips.png"
            media="(min-width:600px)"
          ></source>
          <img
            class="tips--banner-container__image-img"
            src="~/assets/images/tips/banner_tips_mobile.jpg"
            alt="imagen banner de tips"
          >
        </picture>

		<div class="banner-title">
			<h1>Tips</h1>
		</div>
      </div>

      <div class="tips--banner-container__search">
        <MobileButtonSearcher @click="openMobileSearch = true" />
        <SearcherField
          class="tips--banner-container__search_desktop"
          @enter="searchTip"
        />
      </div>
    </div>

    <div v-if="tips && tips.length > 0" class="tips--content-container">
      <ArticleComponent
        v-for="(article, artclIndex) in tips"
        :id="article.id"
        :key="artclIndex"
        class="tips--content-container__articulo"
        :img="article.page_image"
        :img-mobile="article.mobile_image"
        :title="article.title"
        :slug="article.slug"
      />
    </div>
    <h1 v-else class="text-6xl font-bold text-center text-gray-heavy mb-8">
      Lo siento, no existen resultados :(
    </h1>

    <div class="see-more--btn-container">
      <button
        class="more-button"
        @click="handleClickOnSeeMore"
      >
        Ver mas +
      </button>
    </div>

    <v-navigation-drawer
      v-model="openMobileSearch"
      class="tips--sidebar-mobile"
      absolute
      temporary
      width="90%"
    >
      <div class="tips--sidebar-mobile__search-container">
        <SearcherField
          @enter="searchTip"
        />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPropertysValue } from 'functionallibrary'
import MobileButtonSearcher from '~/components/Searcher/MobileButtonSearcher'
import SearcherField from '~/components/Searcher/SearcherField'
import ArticleComponent from '~/components/Article'

async function searchTip (searchValue) {
	const value = searchValue && searchValue.trim()
	await this.$store.dispatch('tips/setSearch', value)
}

async function handleClickOnSeeMore () {
	await this.$store.dispatch('tips/changePage')
	await this.$store.dispatch('tips/getList')
}

async function fetch () {
	await this.$store.dispatch('tips/getList', true)
	await this.$store.dispatch('tips/getDataPage')
}

function data () {
	return {
		openMobileSearch: false
	}
}

export default {
	name: 'PaginaTips',
	components: {
		ArticleComponent,
		MobileButtonSearcher,
		SearcherField
	},
	data,
	fetch,
	computed: {
		...mapState('tips', {
			description: state => getPropertysValue('tipsDataPage.description', state),
			tips: state => getPropertysValue('list', state),
			tipsBanner: state => getPropertysValue('tipsDataPage.page_image', state),
			title: state => getPropertysValue('tipsDataPage.name', state)
		})
	},
	methods: {
		handleClickOnSeeMore,
		searchTip
	}
}
</script>

<style lang="scss" scoped>
.tips {

	&--banner-container {
		@apply relative;
		height: 490px;
		max-height: calc(100vh / 2);

		&__title {
			@apply flex items-center justify-center flex-col;
			@apply w-full h-full;
			@apply z-10;

			@media screen and (min-width: 600px) {
				@apply items-start;
				@apply pl-16;
			}

			h1 {
				@apply text-gray-light;
				@apply font-black text-5xl;
			}

			div {
				@apply mt-2;
				@apply text-gray-base;
				@apply text-opacity-60;
			}
		}

		&__image {
			display: flex;
			align-items: center;
			@apply absolute inset-0;
			@apply z-0;

			&-img {
				@apply w-full h-full;
			}
		}
		&__search {
			top: 90%;
			@apply absolute;
			@apply flex items-center justify-center;
			@apply w-full;
			@apply px-3;

			&_desktop {
				@apply hidden;

				@media screen and (min-width: 600px) {
					@apply flex;
				}
			}
		}
	}

	&--content-container {
		@apply pt-32 pb-20 px-4;

		&__articulo {
				@apply mb-8;

				&:last-child {
					@apply mb-0;
				}
		}

		@media screen and (min-width: 600px) {
			@apply grid gap-4;
			@apply items-start;
			grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

			&__articulo {
					@apply mr-0 mb-0;
			}
		}
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

.banner-image{
	height: 100%;
	width: 100%;
	object-fit: contain;
}

.banner-title{
	position: absolute;
	font-size: 44px;
	font-weight: 800;
	color: white;
	margin-left: 150px;
}

.banner-container{
	height: 100%;
	width: 100%;
}
</style>
