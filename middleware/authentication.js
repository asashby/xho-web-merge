// import { getPropertysValue } from 'functionallibrary'
import { normalizePath } from '@/utils/authUtils'

export default (ctx) => {
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	const { login } = ctx.$auth.options.redirect

	if (ctx.$auth.$state.loggedIn) {
		if (insidePage(login)) {
			ctx.$auth.redirect('home')
		}
	} else {
		ctx.$auth.redirect('login')
	}
}
