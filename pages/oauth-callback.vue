<template>
	<div />
</template>
<script>

async function checkProfileData ($auth, $http, $store) {
	try {
		const user = $auth.$state.user
		const payload = {
			email: user.email,
			last_name: user.family_name || user.last_name,
			name: user.given_name || user.first_name,
			origin: $auth.$state.strategy,
			password: user.sub ? window.btoa(user.sub) : window.btoa(user.id)
		}

		const { data: response } = await $http.post('login-social', payload)
		const { token, tokenMaki, user: userResponse } = response

		console.log(`[oauth-callback]: userResponse -> ${JSON.stringify(userResponse)}`)

		$store.$auth.strategies.local.token.set(token)
		await $store.dispatch('setTokenMaki', tokenMaki)

		if (userResponse) {
			const { addittional_info: additionalInfo } = userResponse
			if (additionalInfo) {
				const { age, size, weight } = additionalInfo
				return age && size && weight
			}
		}
	} catch (error) {
		console.log('[oauth-callback]: Failed inside checkProfileData! -> err:', error)
	}

	return false
}

export default {
	layout: 'headless',
	auth: false,
	async asyncData ({ $auth, query, $http, store, redirect }) {
		console.log(query)
		debugger
		// const fromLocation = $router.history._startLocation
		// const includesAccessToken = fromLocation.includes('access_token')
		const includesAccessToken = query.access_token !== null
		const isLoggedIn = $auth.$state.loggedIn
		console.log(`[oauth-callback]: includesAccessToken -> ${includesAccessToken}, loggedIn -> ${isLoggedIn}`)

		if (includesAccessToken || isLoggedIn) {
			const toProfile = await checkProfileData($auth, $http, store)
			console.log(`[oauth-callback]: toProfile -> ${toProfile}`)

			// redirigir al profile si la data ya existe
			if (toProfile) {
				console.log('[oauth-callback]: redirigiendo al profile')
				redirect('/perfil')
			} else {
				console.log('[oauth-callback]: redirigiendo a objetivos')
				redirect('/objetivos')
			}
		} else {
			// redirigir si no viene del oauth o no esta logueado
			console.log('[oauth-callback]: redirigiendo al "login" si no viene del oauth o no esta logueado')
			$auth.redirect('login')
		}

		return {}
	}
}
</script>
