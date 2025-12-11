/**
 * Auth Store - Demonstrating Svelte 5's native global state management
 *
 * This is Svelte's equivalent to React's Zustand/Redux/Jotai
 * Key differences from React:
 * - No external library needed! Svelte's reactivity works everywhere
 * - Use .svelte.ts files to enable runes outside components
 * - Class-based stores with $state and $derived are powerful and type-safe
 * - Direct property access - no selectors or hooks needed
 */

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
}

// Svelte 5 class-based store using runes
class AuthStore {
	// $state creates reactive state - equivalent to useState but works globally
	user = $state<User | null>(null);

	// $derived creates computed values - equivalent to useMemo
	// Auto-tracks dependencies - no dependency array needed!
	isAuthenticated = $derived(this.user !== null);

	// Derived values can be complex computations
	userInitials = $derived.by(() => {
		if (!this.user?.name) return '';
		return this.user.name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	});

	/**
	 * Login method - sets user state
	 * In React, you'd need: const login = (user) => set({ user, isAuthenticated: true })
	 * In Svelte, just mutate the state directly!
	 */
	login(user: User) {
		this.user = user;
	}

	/**
	 * Logout method - clears user state
	 */
	logout() {
		this.user = null;
	}

	/**
	 * Check if user is authenticated
	 * Used by route guards
	 */
	checkAuth(): boolean {
		return this.isAuthenticated;
	}
}

// Export a singleton instance - this is the global store
// Any component importing this will share the same state
export const authStore = new AuthStore();

/*
 * USAGE COMPARISON:
 *
 * React (with Zustand):
 * ```tsx
 * import { useAuthStore } from './store';
 *
 * function Profile() {
 *   const { user, logout } = useAuthStore();
 *   return (
 *     <div>
 *       <p>Welcome, {user.name}</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * Svelte 5:
 * ```svelte
 * <script>
 *   import { authStore } from '$lib/stores/auth.svelte';
 * </script>
 *
 * <div>
 *   <p>Welcome, {authStore.user.name}</p>
 *   <button onclick={() => authStore.logout()}>Logout</button>
 * </div>
 * ```
 *
 * Key differences:
 * - No hook needed - just import and use
 * - Direct property access with full reactivity
 * - Methods are called directly on the store
 * - Changes automatically propagate to all components
 */
