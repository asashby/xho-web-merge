
export const state = () => ({
	details: {},
	list: [],
	params: {
		limit: 8,
		page: 1,
		search: null,
		time: null
	},
	showRecipes: false,
	totalCountOfRecipes: 0
})

export const actions = {
	async filter ({ commit, dispatch }, filter) {
		const filterUpdated = filter === 'todos' ? null : filter
		commit('SET_RECIPES_FITLER', filterUpdated)
		commit('SET_NEW_PAGE', 1)
		await dispatch('getList', true)
	},
	async getList ({ commit, state }, flagReset) {
		const { params } = state
		console.log('params', params)
		try {
			const [response] = await Promise.all([
				this.$axios.get('recipes', { params })
			])

			const finalList = flagReset ? response.data.data : state.list.concat(response.data.data)
			commit('SET_RECIPE_LIST', finalList)
			commit('SET_TOTAL_RECIPES', response.data.total)
		} catch (err) {
			console.log('error al cargar listado de recetas', err)
		}
	},
	changePage ({ commit, state, dispatch }) {
		const { page } = state.params
		commit('SET_NEW_PAGE', page + 1)
	},
	async setSearch ({ commit, dispatch }, value) {
		commit('SET_NEW_PAGE', 1)
		commit('SET_SEARCH_VALUE', value)
		await dispatch('getList', true)
	},
	async getDetails ({ commit }, slug) {
		try {
			const { data: response } = await this.$axios.get(`recipes/${slug}`)
			commit('SET_RECIPES_DETAILS', response)
		} catch (err) {
			console.log('error al cargar detalle de receta', err)
		}
	},
	async getChallengesCoursePaid ({ commit }) {
		try {
			const { params } = state
			const { data: response1 } = await this.$axios.get('/courses/basico-en-casa/detail-user', { params })
			const { data: response2 } = await this.$axios.get('/courses/intermedio-en-casa/detail-user', { params })
			const { data: response3 } = await this.$axios.get('/courses/avanzado-en-gym/detail-user', { params })

			if (response1.course_paid === 1 || response2.course_paid === 1 || response3.course_paid === 1) {
				commit('SET_SHOW_RECIPES', true)
			}

			console.log(response1)
			console.log(response2)
			console.log(response3)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	}
}

export const getters = {
	showSeeMoreButton (state) {
		return state.list.length < state.totalCountOfRecipes
	}
}

export const mutations = {
	SET_RECIPE_DATA_PAGE (state, recipeDataPage) {
		state.tipsDataPage = { ...recipeDataPage }
	},
	SET_RECIPE_LIST (state, recipeList) {
		state.list = recipeList
	},
	SET_NEW_PAGE (state, page) {
		state.params.page = page
	},
	SET_SEARCH_VALUE (state, searchValue) {
		state.params.search = searchValue
	},
	SET_RECIPES_DETAILS (state, recipeDetails) {
		state.details = recipeDetails
	},
	SET_RECIPES_FITLER (state, filter) {
		state.params.time = filter
	},
	SET_TOTAL_RECIPES (state, totalCount) {
		state.totalCountOfRecipes = totalCount
	},
	SET_SHOW_RECIPES (state, status) {
		state.showRecipes = status
		console.log(state.showRecipes)
	}
}
