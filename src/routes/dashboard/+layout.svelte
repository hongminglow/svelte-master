<!--
  Dashboard Layout - Nested Layout Example

  This demonstrates SvelteKit's nested layouts:
  - This layout wraps all /dashboard/* routes
  - It inherits from the root +layout.svelte
  - Provides sidebar navigation and header

  In React Router, you'd create something like:
  ```tsx
  function DashboardLayout() {
    return (
      <div className="dashboard">
        <Sidebar />
        <main>
          <Outlet /> {/* React Router equivalent of children */}
        </main>
      </div>
    );
  }
  ```
-->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth.svelte';

	// Get children and data from props
	let { children, data } = $props();

	// Sync server data with client store
	$effect(() => {
		if (data.user && !authStore.user) {
			authStore.login(data.user);
		}
	});

	// Navigation items
	const navItems = [
		{ href: '/dashboard', label: 'Overview', icon: '🏠' },
		{ href: '/dashboard/state', label: 'State ($state)', icon: '🎯' },
		{ href: '/dashboard/effects', label: 'Effects ($effect)', icon: '⚡' },
		{ href: '/dashboard/memo', label: 'Memo ($derived)', icon: '🧮' },
		{ href: '/dashboard/props', label: 'Props ($props)', icon: '📦' },
		{ href: '/dashboard/components', label: 'Components', icon: '🧩' },
		{ href: '/dashboard/data-fetching', label: 'Data Fetching', icon: '🔄' },
		{ href: '/dashboard/routing', label: 'Routing', icon: '🛣️' },
		{ href: '/dashboard/async-ui', label: 'Async UI (await)', icon: '⏳' },
		{ href: '/dashboard/key-blocks', label: 'Key Blocks ({#key})', icon: '🔑' },
		{ href: '/dashboard/snippets', label: 'Snippets ({#snippet})', icon: '✂️' },
		{ href: '/dashboard/stores', label: 'Global State (stores)', icon: '🌐' },
		{ href: '/dashboard/debugging', label: 'Debugging ($inspect)', icon: '🐞' }
	];

	// Check if current path matches nav item (for active state)
	function isActive(href: string): boolean {
		const pathname = page.url.pathname as string;
		if (href === '/dashboard') {
			return pathname === '/dashboard';
		}
		return pathname.startsWith(href);
	}

	// Logout handler
	async function handleLogout() {
		// Clear cookie via server action
		await fetch('/api/logout', { method: 'POST' });
		authStore.logout();
		goto('/');
	}
</script>

<div class="dashboard-layout">
	<!-- Sidebar Navigation -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<h2>React → Svelte</h2>
			<span class="badge">Learning</span>
		</div>

		<nav class="nav">
			{#each navItems as item (item.href)}
				<!--
          In React Router, you'd use <NavLink>
          In SvelteKit, use regular <a> with active class logic
        -->
				<a
					href={item.href}
					class="nav-item"
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					<span class="nav-icon">{item.icon}</span>
					<span class="nav-label">{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			{#if authStore.user}
				<div class="user-info">
					<div class="avatar">{authStore.userInitials}</div>
					<div class="user-details">
						<span class="user-name">{authStore.user.name}</span>
						<span class="user-email">{authStore.user.email}</span>
					</div>
				</div>
			{/if}
			<button class="logout-btn" onclick={handleLogout}>
				<span>🚪</span> Logout
			</button>
		</div>
	</aside>

	<!-- Main Content Area -->
	<main class="main-content">
		<header class="content-header">
			<h1>{navItems.find((n) => isActive(n.href))?.label || 'Dashboard'}</h1>
			<p class="breadcrumb">{page.url.pathname}</p>
		</header>

		<div class="content">
			<!-- Children rendered here - equivalent to React's {children} or <Outlet /> -->
			{@render children()}
		</div>
	</main>
</div>

<style>
	.dashboard-layout {
		display: flex;
		min-height: 100vh;
		background: #f3f4f6;
	}

	/* Sidebar */
	.sidebar {
		width: 280px;
		background: white;
		border-right: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		height: 100vh;
	}

	.sidebar-header {
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.sidebar-header h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.badge {
		padding: 0.25rem 0.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		border-radius: 9999px;
	}

	/* Navigation */
	.nav {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		color: #6b7280;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.15s ease;
		margin-bottom: 0.25rem;
	}

	.nav-item:hover {
		background: #f3f4f6;
		color: #1f2937;
	}

	.nav-item.active {
		background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
		color: #667eea;
	}

	.nav-icon {
		font-size: 1.1rem;
	}

	.nav-label {
		font-size: 0.9rem;
	}

	/* Sidebar Footer */
	.sidebar-footer {
		padding: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.avatar {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.85rem;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-weight: 600;
		font-size: 0.9rem;
		color: #1f2937;
	}

	.user-email {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.logout-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background: #f3f4f6;
		border: none;
		border-radius: 0.5rem;
		color: #6b7280;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.logout-btn:hover {
		background: #fee2e2;
		color: #dc2626;
	}

	/* Main Content */
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.content-header {
		padding: 1.5rem 2rem;
		background: white;
		border-bottom: 1px solid #e5e7eb;
	}

	.content-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: #1f2937;
	}

	.breadcrumb {
		margin: 0.25rem 0 0;
		font-size: 0.85rem;
		color: #9ca3af;
		font-family: monospace;
	}

	.content {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.sidebar {
			width: 70px;
		}

		.sidebar-header h2,
		.nav-label,
		.user-details,
		.logout-btn span:last-child {
			display: none;
		}

		.sidebar-header {
			justify-content: center;
		}

		.nav-item {
			justify-content: center;
			padding: 0.75rem;
		}

		.user-info {
			justify-content: center;
		}

		.content {
			padding: 1rem;
		}
	}
</style>
