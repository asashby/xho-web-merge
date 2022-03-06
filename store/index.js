/* eslint-disable no-tabs */
import { isEmpty, getPropertysValue } from 'functionallibrary'
import httpClient from '~/plugins/woocommerceAxios'
import culqiHttpClient from '~/plugins/culqiAxios'
import provincesData from '~/api/provinces'

const alreadyInTheState = (state, prop) => {
	return !(isEmpty(state[prop]))
}

const buildArrayOfItems = (init, end) => {
	const arr = []
	for (let i = init; i <= end; i += 1) {
		arr.push(i)
	}
	return arr
}

export const state = () => ({
	products: [],
	cart: [],
	selectedProduct: {},
	productsCount: 1,
	actualChallengeName: '',
	actualChallengePrice: 0.0,
	userShippingInfo: {},
	shippingProductsData: [],
	woocommerceOrderBody: [],
	ages: buildArrayOfItems(18, 80),
	company: {},
	isMovil: false,
	loading: false,
	menu: [],
	months: [
		'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
	],
	sizes: buildArrayOfItems(130, 210),
	ubigeo: {
		districts: [
			{ name: 'Surquillo', id: 1 },
			{ name: 'Surco', id: 2 },
			{ name: 'San Juan de Miraflores', id: 3 }
		],
		provinces: [
			{ name: 'Lima', id: 1 },
			{ name: 'Arequipa', id: 2 },
			{ name: 'Tumbes', id: 3 }
		]
	},
	weights: buildArrayOfItems(40, 120),
	ximena: {},
	tokenMaki: '',
	fullUser: {},
	showPaymentModal: false,
	showPaymentFailedModal: false,
	paymentModalRedirectionPath: '',
	loginButtonProvider: 'google',
	shippingProvinces: provincesData
})

export const actions = {
	async nuxtServerInit ({ dispatch }) {
		// await dispatch('getProducts')
	},

	addProductToCart ({ commit }, product, count) {
		commit('addToCart', { product, count })
	},

	async getMenuData ({ commit, state }) {
		try {
			if (alreadyInTheState(state, 'menu')) {
				commit('SET_MENU_DATA', state.menu)
			} else {
				const { data: menuData } = await this.$httpPublic.get('sections')
				commit('SET_MENU_DATA', menuData)
			}
		} catch (error) {
			console.log('Failed to load menu data! -> err:', error)
		}
	},
	async companyData ({ commit, state }) {
		const noCompanyData = isEmpty(state.company)

		if (noCompanyData) {
			const { data: response } = await this.$http.get('company/public')
			commit('SET_COMPANY_DATA', response)
		}
	},
	async getXimenaData ({ commit, state }) {
		if (isEmpty(state.ximena)) {
			try {
				const { data: response } = await this.$http.get('/about/sobre-ximena')
				commit('SET_XIMENA_DATA', response)
			} catch (err) {
				console.log('ocurrio un error al cargar datos sobre Ximena', err)
			}
		}
	},
	async getShopProducts ({ commit, state }) {
		try {
			const { data: response } = await httpClient({
				url: '/products',
				params: {
					per_page: 50,
					stock_status: 'instock'
				},
				method: 'get'
			})
			commit('SET_SHOP_PRODUCTS_DATA', response)
		} catch (err) {
			console.log('ocurrio un error al cargar los productos', err)
		}
	},
	async createCulqiOrder ({ commit, state }, body) {
		if (isEmpty(state.ximena)) {
			try {
				const url = '/culqui/create-charge'
				const { data: response } = await this.$http.post(url, body)
				console.log('RESPONSE', response)
			} catch (err) {
				commit('SET_SHOW_PAYMENT_FAILED_MODAL', true)
				console.log('ocurrio un error al crear la orden', err)
			}
		}
	},
	setUserData ({ commit, state }, userData) {
		const userUpdated = {
			...state.auth.user,
			...userData
		}
		commit('SET_AUTH_USER_DATA', userUpdated)
	},
	async logout ({ state }, $auth) {
		// if (state.auth.loggedIn) {
		await $auth.logout()
		// }
	},
	sendShippingInformation ({ commit }) {
		try {
			commit('SET_SHIPPING_PRODUCTS_DATA')
			commit('SET_WOOCOMMERCE_ORDER_BODY')
			commit('SEND_WOOCOMMERCE_ORDER')
		} catch (err) {
			console.log('fallo por el patch', err)
		}
	},
	sendCulqiOrder ({ commit }, body) {
		try {
			commit('SEND_CULQI_ORDER', body)
		} catch (err) {
			console.log('fallo por el patch', err)
		}
	},
	setFullUserData ({ commit }, user) {
		commit('SET_FULL_USER_DATA', user)
	},
	setTokenMaki ({ commit }, tokenMaki) {
		commit('SET_TOKEN_MAKI', tokenMaki)
	},
	setLoading ({ commit, state }) {
		commit('SET_LOADING', state.loading)
	},
	setShowPaymentModal ({ commit, indicator }) {
		commit('SET_SHOW_PAYMENT_MODAL', indicator)
	},
	setShowPaymentFailedModal ({ commit, indicator }) {
		commit('SET_SHOW_PAYMENT_FAILED_MODAL', indicator)
	},
	setPaymentModalRedirectionPath ({ commit, path }) {
		commit('SET_PAYMENT_MODAL_REDIRECTION_PATH', path)
	},
	setLoginButtonProvider ({ commit, provider }) {
		commit('SET_LOGIN_BUTTON_PROVIDER', provider)
	},
	setUserShippingInfo ({ commit }, userShipping) {
		commit('SET_USER_SHIPPING_INFO', userShipping)
		console.log(userShipping)
	}
}

export const mutations = {
	setProductsData (state, productsData) {
		productsData.forEach((value) => {
			state.products.push(value)
		})
	},
	addToCart (state, { productData, quantityData }) {
		let isNewitem = true
		state.cart.forEach((value) => {
			if (value.product.id === productData.id) {
				value.quantity = value.quantity + quantityData
				isNewitem = false
			}
		})

		if (isNewitem) {
			state.cart.push({
				product: productData,
				quantity: quantityData
			})
		}
	},
	removeFromCart (state, product) {
		const index = state.cart.indexOf(product)

		state.cart.splice(index, 1)
	},
	incrementProductsCount (state) {
		state.productsCount++
	},
	decrementProductsCount (state) {
		if (state.productsCount > 1) {
			state.productsCount--
		}
	},
	resetProductsCount (state) {
		state.productsCount = 1
	},
	async selectByAll (state) {
		const { data: response } = await httpClient({
			url: '/products',
			params: {
				per_page: 50,
				stock_status: 'instock'
			},
			method: 'get'
		})

		state.products = response
	},
	async selectByCategory (state, categoryId) {
		const { data: response } = await httpClient({
			url: '/products',
			params: {
				per_page: 50,
				stock_status: 'instock',
				category: categoryId
			},
			method: 'get'
		})

		state.products = response
	},
	selectByDepartment (state, departmentId) {
		console.log(departmentId)
		const data = []
		provincesData.forEach((value) => {
			if (value.region_id === departmentId) {
				data.push(value)
			}
		})

		state.shippingProvinces = data
	},
	setSelectedProduct (state, product) {
		state.selectedProduct = product
	},
	SET_MENU_DATA (state, menuData) {
		state.menu = [].concat(menuData)
	},
	SET_TOKEN_MAKI (state, tokenMaki) {
		state.tokenMaki = tokenMaki
	},
	SET_COMPANY_DATA (state, companyData) {
		state.company = { ...companyData }
	},
	SET_IS_MOVIL (state, isMovil) {
		state.isMovil = isMovil
	},
	SET_XIMENA_DATA (state, ximenaData) {
		state.ximena = { ...ximenaData }
	},
	SET_SHOP_PRODUCTS_DATA (state, response) {
		state.products = response
	},
	SET_AUTH_USER_DATA (state, userData) {
		state.auth.user = { ...userData }
	},
	SET_USER_DATA (state, data) {
		const newUser = { ...state.auth.user }
		newUser.name = data.name
		newUser.sur_name = data.last_name
		state.auth.user = { ...newUser }
	},
	SET_FULL_USER_DATA (state, user) {
		state.fullUser = user
	},
	SET_LOADING (state, value) {
		state.loading = value
	},
	SET_SHOW_PAYMENT_MODAL (state, indicator) {
		state.showPaymentModal = indicator
	},
	SET_SHOW_PAYMENT_FAILED_MODAL (state, indicator) {
		state.showPaymentFailedModal = indicator
	},
	SET_PAYMENT_MODAL_REDIRECTION_PATH (state, path) {
		state.paymentModalRedirectionPath = path
	},
	SET_LOGIN_BUTTON_PROVIDER (state, provider) {
		state.loginButtonProvider = provider
	},
	SET_USER_SHIPPING_INFO (state, userShipping) {
		state.userShippingInfo = {
			firstName: userShipping.firstName,
			lastName: userShipping.lastName,
			firstAddress: userShipping.firstAddress,
			secondAddress: userShipping.secondAddress,
			city: userShipping.city,
			state: userShipping.state,
			country: userShipping.country,
			email: userShipping.email,
			phone: userShipping.phone
		}
	},
	SET_SHIPPING_PRODUCTS_DATA (state) {
		const data = []
		state.cart.forEach((value) => {
			data.push({
				product_id: value.product.id,
				quantity: 1
			})
		})

		state.shippingProductsData = data
	},
	SET_WOOCOMMERCE_ORDER_BODY (state) {
		const body = {
			payment_method: 'bacs',
			payment_method_title: 'Direct Bank Transfer',
			status: 'pending',
			currency: 'PEN',
			set_paid: true,
			billing: {
				first_name: state.userShippingInfo.firstName,
				last_name: state.userShippingInfo.lastName,
				address_1: state.userShippingInfo.firstAddress,
				address_2: state.userShippingInfo.secondAddress,
				city: state.userShippingInfo.city,
				state: state.userShippingInfo.state,
				country: state.userShippingInfo.country,
				email: state.userShippingInfo.email,
				phone: state.userShippingInfo.phone
			},
			shipping: {
				first_name: state.userShippingInfo.firstName,
				last_name: state.userShippingInfo.lastName,
				address_1: state.userShippingInfo.firstAddress,
				address_2: state.userShippingInfo.secondAddress,
				city: state.userShippingInfo.city,
				state: state.userShippingInfo.state,
				country: state.userShippingInfo.country,
				email: state.userShippingInfo.email,
				phone: state.userShippingInfo.phone
			},
			line_items: state.shippingProductsData,
			shipping_lines: [
				{
					method_id: 'flat_rate',
					method_title: 'Flat Rate',
					total: '10.00'
				}
			]
		}

		state.woocommerceOrderBody = body
		state.cart = []

		console.log(state.woocommerceOrderBody)
	},
	async SEND_WOOCOMMERCE_ORDER (state) {
		const response = await httpClient({
			url: '/orders',
			method: 'post',
			data: state.woocommerceOrderBody
		})
		console.log(response)
	},
	async SEND_CULQI_ORDER (state, body) {
		const response = await culqiHttpClient({
			url: '/charges',
			method: 'post',
			headers: {
				// "X-CSRF-TOKEN": getCookie('csrf_token')
			},
			data: body
		})
		console.log(response)
	}
}

export const getters = {
	getProductsCount (state) {
		return state.productsCount
	},
	getSelectedProduct (state) {
		return state.selectedProduct
	},
	termsAndConditionsData (state) {
		return getPropertysValue('company.data.helpCenter.description', state)
	},
	politicsAndPrivacyData (state) {
		return getPropertysValue('company.data.privacyPolicy.description', state)
	},
	isGoogle (state) {
		return getPropertysValue('auth.strategy', state) === 'google'
	},
	isFacebook (state) {
		return getPropertysValue('auth.strategy', state) === 'facebook'
	},
	isUser (state) {
		return getPropertysValue('auth.user', state)
	},
	isLoading (state) {
		return getPropertysValue('loading', state)
	},
	getTokenMaki (state) {
		return state.tokenMaki
	}
}
