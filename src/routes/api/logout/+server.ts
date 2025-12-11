/**
 * API Logout Route
 *
 * This demonstrates SvelteKit's API routes (+server.ts files)
 * In React, you'd need to set up a separate backend (Express, etc.)
 * In SvelteKit, API routes are co-located with your app
 */

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	return json({ success: true });
};
