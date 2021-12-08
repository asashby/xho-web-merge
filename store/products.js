import products from '@/api/productsData'

export const state = () => ({
	details: []
})

export const actions = {
	getDetails ({ commit }, id) {
		try {
			commit('SET_PRODUCTS_DETAILS', products)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	}
}

export const mutations = {
	SET_PRODUCTS_DETAILS (state, productsDetails) {
		state.details = productsDetails
	}
}
