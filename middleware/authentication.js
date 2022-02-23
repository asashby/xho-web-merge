// import { getPropertysValue } from 'functionallibrary'
import { normalizePath } from '@/utils/authUtils'

export default (ctx) => {
	// console.log('ctx.route.path', ctx.route.path)
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	const { login } = ctx.$auth.options.redirect
	// const flagGoal = getPropertysValue('$state.user.flag_goald', ctx.$auth)

	if (ctx.$auth.$state.loggedIn) {
		if (insidePage('/') || insidePage(login)) {
			ctx.$auth.redirect('home')
		}
	} else {
		ctx.$auth.redirect('login')
	}
}
