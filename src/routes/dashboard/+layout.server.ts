/**
 * Dashboard Layout Server - Auth Guard
 *
 * This demonstrates SvelteKit's server-side route protection.
 * In React, you'd typically:
 * - Create a PrivateRoute component
 * - Check auth in useEffect and redirect
 * - Or use a higher-order component
 *
 * In SvelteKit, the load function handles this elegantly.
 */

import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/stores/auth.svelte';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Check for session cookie
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		// Not authenticated - redirect to login
		redirect(303, '/');
	}

	try {
		const user: User = JSON.parse(sessionCookie);
		return { user };
	} catch {
		// Invalid session - redirect to login
		redirect(303, '/');
	}
};
