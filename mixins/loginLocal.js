export const LoginLocal = {
	async beforeMount () {
		const fromLocation = this.$router.history._startLocation
		alert(fromLocation)
		if (fromLocation.includes('access_token') || this.$auth.$state.loggedIn) {
			const toProfile = await this.loginWithLocal()
			this.$router.replace(toProfile ? '/perfil' : '/objetivos')
			// this.$auth.redirect(toProfile ? 'profile' : 'home')
		}
	},
	mounted () {
		// const from = this.$router.history._startLocation
		// window.alert(document.cookie)
		// window.alert(from)
	},
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
				const { data: response } = await this.$http.post('login-social', payload)
				const { token, tokenMaki, user: userResponse } = response

				this.$store.$auth.strategies.local.token.set(token)
				this.$store.dispatch('setTokenMaki', tokenMaki)

				if (userResponse) {
					const { addittional_info: additionalInfo } = userResponse
					if (additionalInfo) {
						const { age, size, weight } = additionalInfo
						return age && size && weight
					}
				}
			} catch (error) {
				console.log('Failed inside loginWithLocal! -> err:', error)
			}

			return false
		}
	}
}
