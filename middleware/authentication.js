// import { getPropertysValue } from 'functionallibrary'
import { normalizePath } from '@/utils/authUtils'

export default async (ctx) => {
	// console.log('ctx.route.path', ctx.route.path)
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	const { login } = ctx.$auth.options.redirect
	// const flagGoal = getPropertysValue('$state.user.flag_goald', ctx.$auth)

	if (ctx.$auth.$state.loggedIn) {
		if (insidePage('/')) {
			await loginLocal(ctx)
		}

		if (insidePage('/') || insidePage(login)) {
			ctx.$auth.redirect('home')
		}
	} else {
		ctx.$auth.redirect('login')
	}
}

async function loginLocal (ctx) {
	const {
		email,
		family_name: googleLastName,
		first_name: name,
		given_name: googleName,
		id,
		last_name: lastName,
		sub
	} = ctx.$auth.$state.user
	const body = {
		email,
		last_name: googleLastName || lastName,
		name: googleName || name,
		origin: ctx.$auth.$state.strategy,
		password: sub ? window.btoa(sub) : window.btoa(id)
	}
	const { data: response } = await ctx.$http.post('login-social', body)
	const { token, tokenMaki, user: userResponse } = response
	ctx.$store.$auth.strategies.local.token.set(token)
	ctx.$store.dispatch('setTokenMaki', tokenMaki)
	if (userResponse) {
		const { addittional_info: additionalInfo } = userResponse
		if (additionalInfo) {
			const { age, size, weight } = additionalInfo
			if (age && size && weight) {
				reditectTo(ctx)
			}
		}
	}
}

function reditectTo (ctx) {
	if (window.innerWidth < 1024) {
		ctx.$router.push('/perfil')
	} else {
		ctx.$router.push('/perfil')
	}
}
