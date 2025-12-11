<!--
  Root Layout - SvelteKit's equivalent to React's App wrapper

  In React, you'd typically wrap your app with providers:
  ```tsx
  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
  ```

  In SvelteKit, the +layout.svelte serves this purpose:
  - It wraps all pages within its route
  - Can provide context to children
  - Handles shared UI (nav, footer, etc.)
  - Children are rendered via {@render children()}
-->
<script lang="ts">
	import './layout.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import favicon from '$lib/assets/favicon.svg';

	// Receive children snippet - in React this would be: { children }
	let { children } = $props();

	// Create QueryClient - same pattern as React!
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5, // 5 minutes
				refetchOnWindowFocus: false
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Learn Svelte 5 syntax through React comparisons" />
</svelte:head>

<!--
  QueryClientProvider wraps the app - identical to React!
  This is one of few cases where React and Svelte look similar
-->
<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
