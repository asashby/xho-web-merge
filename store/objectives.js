export const actions = {
	async checkProfileData ({ rootState, dispatch }) {
		console.log('[store: objectives] inside checkProfileData()')

		const initialToken = this.$auth.getStrategy().token.get()
		const initialStrategyName = this.$auth.getStrategy().name

		try {
			const initialUser = rootState.auth.user

			if (!initialUser) {
				throw new Error('user is null')
			}

			const payload = {
				email: initialUser.email,
				last_name: initialUser.family_name || initialUser.last_name,
				name: initialUser.given_name || initialUser.first_name,
				origin: rootState.auth.strategy,
				password: initialUser.sub ? window.btoa(initialUser.sub) : window.btoa(initialUser.id)
			}

			console.log('[store: objectives]: login with local strategy!')
			const { data: response } = await this.$auth.loginWith('local', { data: payload })
			const { tokenMaki, token } = response

			await this.$auth.setUserToken(token)
			await this.$auth.fetchUser()
			await dispatch('setTokenMaki', tokenMaki, { root: true })

			if (this.$auth.user) {
				console.log(`[store: objectives]: user logged with id -> ${this.$auth.user.id}`)
				const { addittional_info: additionalInfo } = this.$auth.user

				console.log('[store: objectives]: additionalInfo -> %o', additionalInfo)
				if (additionalInfo) {
					const { age, size, weight } = additionalInfo
					return age && size && weight
				}
			}
		} catch (error) {
			console.log('[store: objectives]: Failed inside checkProfileData! -> err:', error)

			if (initialToken) {
				console.log('[store: objectives]: reverting to initial strategy ->', initialStrategyName)
				this.$auth.setStrategy(initialStrategyName)

				if (initialToken) {
					console.log('[store: objectives]: reverting to initial token ->', initialToken)
					await this.$auth.setUserToken(initialToken)
					await this.$auth.fetchUser()
				}

				console.log('[store: objectives]: is loggedIn again? ->', this.$auth.loggedIn)
			}
		}

		return false
	}
}
