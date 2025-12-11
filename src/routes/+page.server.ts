/**
 * Login Page Server - SvelteKit Form Actions
 *
 * This demonstrates SvelteKit's built-in form handling - no equivalent in React!
 * In React, you'd need:
 * - Set up API routes manually
 * - Handle form submission with fetch()
 * - Manage loading/error states manually
 *
 * SvelteKit provides:
 * - load() function for initial data
 * - actions object for form handling
 * - Built-in progressive enhancement
 * - Type-safe with $types
 */

import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/login';

// Demo credentials for the learning platform
const DEMO_USER = {
	email: 'demo@example.com',
	password: 'password123'
};

/**
 * Load function - runs on server before page renders
 *
 * In React, you'd typically:
 * - Use useEffect to fetch initial data
 * - Or use TanStack Query/SWR
 * - Handle loading states manually
 *
 * In SvelteKit:
 * - Data is fetched server-side
 * - Available immediately in the component via `data` prop
 * - SSR-friendly by default
 */
export const load: PageServerLoad = async () => {
	// Initialize form with schema (sets up validation & default values)
	const form = await superValidate(zod(loginSchema));

	return {
		form,
		// Additional data can be passed here
		demoCredentials: DEMO_USER.email
	};
};

/**
 * Actions - handle form submissions
 *
 * Key differences from React:
 * - No need to set up API endpoints
 * - Type-safe request handling
 * - Automatic CSRF protection
 * - Works without JavaScript (progressive enhancement)
 */
export const actions: Actions = {
	// 'default' action handles POST to this page
	// Named actions would be: login: async ({ request }) => { ... }
	default: async ({ request, cookies }) => {
		// Validate form data against schema
		const form = await superValidate(request, zod(loginSchema));

		// If validation fails, return errors
		// Superforms automatically displays these in the form
		if (!form.valid) {
			return fail(400, { form });
		}

		// Extract validated data (type-safe!)
		const { email, password, rememberMe } = form.data;

		// Simulate authentication (in real app, check against database)
		if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
			// Return validation error for invalid credentials
			return fail(400, {
				form,
				error: 'Invalid email or password. Try demo@example.com / password123'
			});
		}

		// Set session cookie (in real app, use proper session management)
		cookies.set(
			'session',
			JSON.stringify({
				id: '1',
				email,
				name: 'Demo User'
			}),
			{
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days or 1 day
			}
		);

		// Redirect to dashboard on success
		// In React, you'd use navigate() or router.push()
		redirect(303, '/dashboard');
	}
};
