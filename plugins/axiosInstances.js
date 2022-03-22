/* eslint-disable no-tabs */
export default ({ $axios, env, store, redirect, $auth }, inject) => {
	store.dispatch('setLoading', true)
	const http = $axios.create()
	http.setBaseURL(env.URL_BASE)

	http.onRequest((config) => {
		const headers = config.headers
		const token = `Bearer ${this.$auth.strategies.local.token.get()}`
		if (token) {
			headers.common.Authorization = token
		} else {
			store.$auth.logout()
		}
		store.dispatch('setLoading', false)
		return config
	})

	inject('http', http)
}
