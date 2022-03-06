<template>
  <div />
</template>

<script>
export default {
	layout: 'headless',
	auth: false,
	async beforeMount () {
		const fromLocation = this.$router.history._startLocation
		const includesAccessToken = fromLocation.includes('access_token')
		const isLoggedIn = this.$auth.$state.loggedIn
		alert(`[oauth-callback]: includesAccessToken -> ${includesAccessToken}, loggedIn -> ${isLoggedIn}, fromLocation -> ${fromLocation}`)

		if (includesAccessToken || isLoggedIn) {
			const toProfile = await this.checkProfileData()
			alert(`[oauth-callback]: toProfile -> ${toProfile}`)

			if (toProfile) {
				this.$router.push('/perfil')
			} else {
				this.$router.push('/objetivos')
			}
		} else {
			this.$auth.redirect('login')
		}
	},
	methods: {
		async checkProfileData () {
			const user = this.$auth.$state.user
			const payload = {
				email: user.email,
				last_name: user.family_name || user.last_name,
				name: user.given_name || user.first_name,
				origin: this.$auth.$state.strategy,
				password: user.sub ? window.btoa(user.sub) : window.btoa(user.id)
			}

			try {
				const { data: response } = await this.$http.post('login-social', payload)
				const { token, tokenMaki, user: userResponse } = response

				alert(`[oauth-callback]: userResponse -> ${JSON.stringify(userResponse)}`)

				this.$store.$auth.strategies.local.token.set(token)
				await this.$store.dispatch('setTokenMaki', tokenMaki)

				if (userResponse) {
					const { addittional_info: additionalInfo } = userResponse
					if (additionalInfo) {
						const { age, size, weight } = additionalInfo
						return age && size && weight
					}
				}
			} catch (error) {
				console.log('[oauth-callback]: Failed inside loginWithLocal! -> err:', error)
				alert('error on loginWithLocal')
			}

			return false
		}
	}
}
</script>
