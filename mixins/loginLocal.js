export const LoginLocal = {
	async beforeMount () {
		const fromLocation = this.$router.history._startLocation
		const includesAccessToken = fromLocation.includes('access_token')
		alert(`[loginLocal]: includesAccessToken -> ${includesAccessToken}, loggedIn -> ${this.$auth.$state.loggedIn}, fromLocation -> ${fromLocation}`)
		if (includesAccessToken || this.$auth.$state.loggedIn) {
			const toProfile = await this.loginWithLocal()
			alert(`[loginLocal]: toProfile -> ${toProfile}`)

			if (toProfile) {
				this.$router.replace('/perfil')
			}
			// this.$router.replace(toProfile ? '/perfil' : '/objetivos')
			// this.$auth.redirect(toProfile ? 'profile' : 'home')
		}
		// else {
		// 	this.$auth.redirect('login')
		// }
	},
	// mounted () {
	// const from = this.$router.history._startLocation
	// window.alert(document.cookie)
	// window.alert(from)
	// },
	methods: {
		async loginWithLocal () {
			const user = this.$auth.$state.user
			const payload = {
				email: user.email,
				last_name: user.family_name || user.last_name,
				name: user.given_name || user.first_name,
				origin: this.$auth.$state.strategy,
				password: user.sub ? window.btoa(user.sub) : window.btoa(user.id)
			}

			try {
				const { data: response } = await this.$axios.post('login-social', payload)
				const { token, tokenMaki, user: userResponse } = response

				alert(`[loginLocal]: userResponse -> ${JSON.stringify(userResponse)}`)

				this.$auth.strategies.local.token.set(token)
				await this.$store.dispatch('setTokenMaki', tokenMaki)

				if (userResponse) {
					const { addittional_info: additionalInfo } = userResponse
					if (additionalInfo) {
						const { age, size, weight } = additionalInfo
						return age && size && weight
					}
				}
			} catch (error) {
				console.log('[loginLocal]: Failed inside loginWithLocal! -> err:', error)
				alert('error on loginWithLocal')
			}

			return false
		}
	}
}
