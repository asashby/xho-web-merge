// import { getPropertysValue } from 'functionallibrary'
import { normalizePath } from '@/utils/authUtils'

export default async (ctx) => {
	// console.log('ctx.route.path', ctx.route.path)
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	const { login } = ctx.$auth.options.redirect
	// const flagGoal = getPropertysValue('$state.user.flag_goald', ctx.$auth)

	if (ctx.$auth.$state.loggedIn) {
		if (insidePage('/objetivos')) {
			const toProfile = await loginLocal(ctx)
			ctx.$auth.redirect(toProfile ? 'profile' : 'home')
		}

		if (insidePage('/') || insidePage(login)) {
			ctx.$auth.redirect('home')
		}
	} else {
		ctx.$auth.redirect('login')
	}
}

async function loginLocal (ctx) {
	const user = ctx.$auth.$state.user
	const payload = {
		email: user.email,
		last_name: user.family_name || user.last_name,
		name: user.given_name || user.first_name,
		origin: ctx.$auth.$state.strategy,
		password: user.sub ? window.btoa(user.sub) : window.btoa(user.id)
	}

	const { data: response } = await ctx.$http.post('login-social', payload)
	const { token, tokenMaki, user: userResponse } = response

	ctx.$store.$auth.strategies.local.token.set(token)
	ctx.$store.dispatch('setTokenMaki', tokenMaki)

	if (userResponse) {
		const { addittional_info: additionalInfo } = userResponse
		if (additionalInfo) {
			const { age, size, weight } = additionalInfo
			return age && size && weight
		}
	}

	return false
}
