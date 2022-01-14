/* eslint-disable no-tabs */
import { isEmpty, getPropertysValue } from 'functionallibrary'
import httpClient from '~/plugins/woocommerceAxios'
import culqiHttpClient from '~/plugins/culqiAxios'

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
	products: [
		{
			id: 72,
			title: 'ISOXIPRO Whey protein isolate – Vainilla',
			price: 179.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-vainilla.jpg?alt=media&token=a54c6659-2e4e-4a53-8c60-6dee240a3f13',
			sku: 'PWV-1',
			category: 'PROTEINA'
		},
		{
			id: 68,
			title: 'Muñequera',
			price: 39.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/mu%C3%B1equera.jpg?alt=media&token=07113141-f054-4dea-91fb-2601cd69af44',
			sku: 'MHOX',
			category: 'IMPLEMENTOS'
		},
		{
			id: 67,
			title: 'Vincha',
			price: 24.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/vincha.jpg?alt=media&token=55b2ccaf-06c2-409f-9abc-127bf12cd620',
			sku: 'CH3-1-1',
			category: 'IMPLEMENTOS'
		},
		{
			id: 64,
			title: 'Polera XOH',
			price: 89.00,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/polera.jpg?alt=media&token=83cff30b-d056-4ed6-8719-d82a9a9ed0cd',
			sku: 'PXOH',
			category: 'IMPLEMENTOS'
		},
		{
			id: 63,
			title: 'Shaker',
			price: 29.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/shaker.jpg?alt=media&token=f591ed57-4477-4eda-9439-fb2b300d6f20',
			sku: 'CH3-1',
			category: 'IMPLEMENTOS'
		},
		{
			id: 62,
			title: 'Toalla Xiprofit',
			price: 29.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/toalla.jpg?alt=media&token=7063b8ad-434d-445c-b649-b25930b587b3',
			sku: 'TXP',
			category: 'IMPLEMENTOS'
		},
		{
			id: 41,
			title: 'PACK ISOXIPRO Whey protein isolate + Shaker + Tobillera',
			price: 229.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker-tobillera.jpg?alt=media&token=60184469-d1b7-478e-90fc-3f43138b3814',
			sku: 'PIPT-1-1',
			category: 'PROMOCIONES, PROTEINA'
		},
		{
			id: 37,
			title: 'PACK ISOXIPRO Whey protein isolate + Shaker',
			price: 209.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker.jpg?alt=media&token=4cf5576a-a5f6-4633-a574-8b8fe0633c03',
			sku: 'PIPT-1',
			category: 'PROMOCIONES, PROTEINA'
		},
		{
			id: 18,
			title: 'Pack DUO Whey Protein y Colágeno Hidrolizado',
			price: 288.00,
			description: 'Isoxipro proteína en polvo de suero de leche aislada de 900g (30 servicios), Contiene 25gr de proteína por servicio. Es baja en grasa, sin lactosa, baja carbohidratos y sin azúcar. Materia prima importada WPI 95%.',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro-colageno.jpg?alt=media&token=cc70de1f-d5b8-4f7a-928e-3a948a11d4dc',
			sku: 'PPC',
			category: 'PROMOCIONES'
		},
		{
			id: 17,
			title: 'Pack DUO Whey Protein Isolate',
			price: 338.00,
			description: '¡Llévate 2 proteínas!',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro.jpg?alt=media&token=5c7dec60-8ee0-40c5-809c-03b52eb1908c',
			sku: 'PWI',
			category: 'PROMOCIONES'
		},
		{
			id: 15,
			title: 'ISOXIPRO Whey protein isolate – Chocolate',
			price: 179.00,
			description: 'Proteína en polvo de suero de leche aislada de 1kg  (33 servicios aproximadamente),Contiene 24gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
			sku: 'PWCH',
			category: 'PROTEINA'
		},
		{
			id: 14,
			title: 'Colágeno Hidrolizado',
			price: 139.00,
			description: 'Beneficios del Colágeno Hidrolizado',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/colageno-hidrolizado.jpg?alt=media&token=e6dec4ce-60ea-4a19-ad08-bb547275d624',
			sku: 'CH2',
			category: 'COLÁGENO'
		}
	],
	products2: [
		{
			id: 72,
			title: 'ISOXIPRO Whey protein isolate – Vainilla',
			price: 179.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-vainilla.jpg?alt=media&token=a54c6659-2e4e-4a53-8c60-6dee240a3f13',
			sku: 'PWV-1',
			category: 'PROTEINA'
		},
		{
			id: 68,
			title: 'Muñequera',
			price: 39.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/mu%C3%B1equera.jpg?alt=media&token=07113141-f054-4dea-91fb-2601cd69af44',
			sku: 'MHOX',
			category: 'IMPLEMENTOS'
		},
		{
			id: 67,
			title: 'Vincha',
			price: 24.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/vincha.jpg?alt=media&token=55b2ccaf-06c2-409f-9abc-127bf12cd620',
			sku: 'CH3-1-1',
			category: 'IMPLEMENTOS'
		},
		{
			id: 64,
			title: 'Polera XOH',
			price: 89.00,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/polera.jpg?alt=media&token=83cff30b-d056-4ed6-8719-d82a9a9ed0cd',
			sku: 'PXOH',
			category: 'IMPLEMENTOS'
		},
		{
			id: 63,
			title: 'Shaker',
			price: 29.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/shaker.jpg?alt=media&token=f591ed57-4477-4eda-9439-fb2b300d6f20',
			sku: 'CH3-1',
			category: 'IMPLEMENTOS'
		},
		{
			id: 62,
			title: 'Toalla Xiprofit',
			price: 29.90,
			description: '',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/toalla.jpg?alt=media&token=7063b8ad-434d-445c-b649-b25930b587b3',
			sku: 'TXP',
			category: 'IMPLEMENTOS'
		},
		{
			id: 41,
			title: 'PACK ISOXIPRO Whey protein isolate + Shaker + Tobillera',
			price: 229.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker-tobillera.jpg?alt=media&token=60184469-d1b7-478e-90fc-3f43138b3814',
			sku: 'PIPT-1-1',
			category: 'PROMOCIONES, PROTEINA'
		},
		{
			id: 37,
			title: 'PACK ISOXIPRO Whey protein isolate + Shaker',
			price: 209.00,
			description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker.jpg?alt=media&token=4cf5576a-a5f6-4633-a574-8b8fe0633c03',
			sku: 'PIPT-1',
			category: 'PROMOCIONES, PROTEINA'
		},
		{
			id: 18,
			title: 'Pack DUO Whey Protein y Colágeno Hidrolizado',
			price: 288.00,
			description: 'Isoxipro proteína en polvo de suero de leche aislada de 900g (30 servicios), Contiene 25gr de proteína por servicio. Es baja en grasa, sin lactosa, baja carbohidratos y sin azúcar. Materia prima importada WPI 95%.',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro-colageno.jpg?alt=media&token=cc70de1f-d5b8-4f7a-928e-3a948a11d4dc',
			sku: 'PPC',
			category: 'PROMOCIONES'
		},
		{
			id: 17,
			title: 'Pack DUO Whey Protein Isolate',
			price: 338.00,
			description: '¡Llévate 2 proteínas!',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro.jpg?alt=media&token=5c7dec60-8ee0-40c5-809c-03b52eb1908c',
			sku: 'PWI',
			category: 'PROMOCIONES'
		},
		{
			id: 15,
			title: 'ISOXIPRO Whey protein isolate – Chocolate',
			price: 179.00,
			description: 'Proteína en polvo de suero de leche aislada de 1kg  (33 servicios aproximadamente),Contiene 24gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
			sku: 'PWCH',
			category: 'PROTEINA'
		},
		{
			id: 14,
			title: 'Colágeno Hidrolizado',
			price: 139.00,
			description: 'Beneficios del Colágeno Hidrolizado',
			image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/colageno-hidrolizado.jpg?alt=media&token=e6dec4ce-60ea-4a19-ad08-bb547275d624',
			sku: 'CH2',
			category: 'COLÁGENO'
		}
	],
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
	loginButtonProvider: 'google'
})

export const actions = {
	async nuxtServerInit ({ dispatch }) {
		await dispatch('getProducts')
	},

	addProductToCart ({ commit }, product, count) {
		commit('addToCart', { product, count })
	},

	async getMenuData ({ commit, state }) {
		if (alreadyInTheState(state, 'menu')) {
			commit('SET_MENU_DATA', state.menu)
		} else {
			const { data: menuData } = await this.$httpPublic.get('sections')
			commit('SET_MENU_DATA', menuData)
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
		if (state.auth.loggedIn) {
			await $auth.logout()
		}
	},
	sendShippingInformation ({ commit }) {
		try {
			commit('SET_SHIPPING_PRODUCTS_DATA')
			commit('SET_WOOCOMMERCE_ORDER_BODY')
			commit('SEND_WOOCOMMERCE_ORDER')
			// const { requestParams } = state

			/* const response = await httpClient({
				url: '/orders',
				method: 'post',
				data: body
			}) */
			// const { data: response } = await this.$http.patch(`/courses/${slug}/payment`, { params, data: body })
			// console.log(response)
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
	addToCart (state, { product, quantity }) {
		state.cart.push({
			product,
			quantity
		})
	},
	removeFromCart (state, product) {
		const index = state.cart.indexOf(product)

		state.cart.splice(index, 1)
	},
	decrementProductsCount (state) {
		if (state.productsCount > 1) {
			state.productsCount--
		}
	},
	selectByAll (state, productsData) {
		const data = []
		productsData.forEach((value) => {
			data.push(value)
		})

		state.products2 = data
	},
	selectByCollagen (state, productsData) {
		const data = []
		productsData.forEach((value) => {
			if (value.category.includes('COLÁGENO')) {
				data.push(value)
			}
		})

		state.products2 = data
	},
	selectByImplements (state, productsData) {
		const data = []
		productsData.forEach((value) => {
			if (value.category.includes('IMPLEMENTOS')) {
				data.push(value)
			}
		})

		state.products2 = data
	},
	selectByPromotions (state, productsData) {
		const data = []
		productsData.forEach((value) => {
			if (value.category.includes('PROMOCIONES')) {
				data.push(value)
			}
		})

		state.products2 = data
	},
	selectByProteins (state, productsData) {
		const data = []
		productsData.forEach((value) => {
			if (value.category.includes('PROTEINA')) {
				data.push(value)
			}
		})

		state.products2 = data
	},
	incrementProductsCount (state) {
		state.productsCount++
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
