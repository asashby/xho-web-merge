// import { getPropertysValue } from 'functionallibrary'
import { normalizePath } from '@/utils/authUtils'

export default (ctx) => {
	// console.log('ctx.route.path', ctx.route.path)
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	const { login } = ctx.$auth.options.redirect
	// const flagGoal = getPropertysValue('$state.user.flag_goald', ctx.$auth)

	alert(`loggedIn? ${ctx.$auth.$state.loggedIn}, ctx path: ${normalizePath(ctx.route.path, ctx)}, incoming path: ${normalizePath(login, ctx)}`)

	if (ctx.$auth.$state.loggedIn) {
		if (insidePage(login)) {
			ctx.$auth.redirect('home')
		}
	} 
	// else {
	// 	ctx.$auth.redirect('login')
	// }
}
