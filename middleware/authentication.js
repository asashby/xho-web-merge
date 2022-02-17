import { getPropertysValue } from 'functionallibrary'
import { routeOption, getMatchedComponents, normalizePath } from '@/utils/authUtils'

export default async (ctx) => {
	if (routeOption(ctx.route, 'auth', false)) {
		return
	}

	// Disable middleware if no route was matched to allow 404/error page
	const matches = []
	const Components = getMatchedComponents(ctx.route, matches)
	if (!Components.length) {
		return
	}

	const pageIsInGuestMode = routeOption(ctx.route, 'auth', 'guest')
	const insidePage = page => normalizePath(ctx.route.path, ctx) === normalizePath(page, ctx)

	if (!ctx.$auth.$state.loggedIn) {
		ctx.$auth.redirect('login')
		return
	}

	// determinar si el usuario ya tiene sus objetivos definidos
	const flagGoald = getPropertysValue('$state.user.flag_goald', ctx.$auth)

	if (ctx.$auth.$state.loggedIn && !flagGoald) {
		ctx.$auth.redirect('goals')
		return
	}

	if (ctx.$auth.$state.loggedIn) {
		// Perform scheme checks.
		const { tokenExpired, refreshTokenExpired, isRefreshable } = ctx.$auth.check(true)

		// -- Authorized --
		if (insidePage(ctx.$auth.options.redirect.login) || pageIsInGuestMode) {
			ctx.$auth.redirect('home')
		}

		// Refresh token has expired. There is no way to refresh. Force reset.
		if (refreshTokenExpired) {
			ctx.$auth.reset()
		} else if (tokenExpired) {
			// Token has expired. Check if refresh token is available.
			if (isRefreshable) {
				// Refresh token is available. Attempt refresh.
				try {
					await ctx.$auth.refreshTokens()
				} catch (error) {
					// Reset when refresh was not successfull
					ctx.$auth.reset()
				}
			} else {
				// Refresh token is not available. Force reset.
				ctx.$auth.reset()
			}
		}

		// -- Guest --
		// (Those passing `callback` at runtime need to mark their callback component
		// with `auth: false` to avoid an unnecessary redirect from callback to login)
	} else if (!pageIsInGuestMode) {
		ctx.$auth.redirect('login')
	}
}
