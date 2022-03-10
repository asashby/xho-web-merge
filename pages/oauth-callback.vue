<template>
  <div />
</template>
<script>

export default {
	layout: 'headless',
	auth: false,
	async fetch ({ $auth, query, store, route, redirect, app }) {
		console.log(query.access_token, query)

		const includesAccessToken = route.hash.includes('access_token')
		console.log(`[oauth-callback]: includesAccessToken -> ${includesAccessToken}, loggedIn -> ${$auth.loggedIn}`)

		if (includesAccessToken && !$auth.loggedIn) {
			console.log('[oauth-callback]: has access token but is not logged in, try fetch user')
			try {
				await $auth.fetchUser()
			} catch (error) {
				console.log('[oauth-callback]: $auth.fetchUser() fail -> err:', error)
			}
		}

		if (includesAccessToken || $auth.loggedIn) {
			const toProfile = await store.dispatch('objectives/checkProfileData')
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
	}
}
</script>
