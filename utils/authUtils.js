// INFO: Unexported auth module util
export function normalizePath (path = '', ctx) {
	// Remove query string
	let result = path.split('?')[0]

	// Remove base path
	if (ctx && ctx.base) {
		result = result.replace(ctx.base, '/')
	}

	// Remove redundant / from the end of path
	if (result.charAt(result.length - 1) === '/') {
		result = result.slice(0, -1)
	}

	// Remove duplicate slashes
	result = result.replace(/\/+/g, '/')

	return result
}
