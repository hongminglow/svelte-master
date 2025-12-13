<!--
  Dashboard Overview Page

  Welcome page for the React → Svelte learning platform.
  Provides an overview of all available learning sections.
-->
<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { authStore } from '$lib/stores/auth.svelte';
	// Quick comparison examples for the hero section - imported from code-examples.ts to avoid parsing issues
	import { dashboardOverviewExamples } from '$lib/code-examples';
	const quickComparison = dashboardOverviewExamples;

	// Learning sections data
	const sections = [
		{
			title: 'State Management',
			href: '/dashboard/state',
			icon: '🎯',
			description: 'Learn $state rune vs useState hook',
			react: 'useState, useReducer',
			svelte: '$state, $state.raw'
		},
		{
			title: 'Stores',
			href: '/dashboard/stores',
			icon: '📦',
			description: 'Learn writable stores vs Zustand',
			react: 'Zustand, Context',
			svelte: 'writable, $state modules'
		},
		{
			title: 'Side Effects',
			href: '/dashboard/effects',
			icon: '⚡',
			description: 'Learn $effect rune vs useEffect hook',
			react: 'useEffect, useLayoutEffect',
			svelte: '$effect, $effect.pre'
		},
		{
			title: 'Memoization',
			href: '/dashboard/memo',
			icon: '🧮',
			description: 'Learn $derived vs useMemo/useCallback',
			react: 'useMemo, useCallback',
			svelte: '$derived, $derived.by'
		},
		{
			title: 'Component Props',
			href: '/dashboard/props',
			icon: '📦',
			description: 'Learn $props rune vs destructured props',
			react: 'function Component(props)',
			svelte: 'let { props } = $props()'
		},
		{
			title: 'Component Patterns',
			href: '/dashboard/components',
			icon: '🧩',
			description: 'Learn Svelte component vs React component',
			react: 'JSX, className, fragments',
			svelte: 'Templates, class, slots'
		},
		{
			title: 'Snippets',
			href: '/dashboard/snippets',
			icon: '🧩',
			description: 'Learn {#snippet} + {@render} patterns',
			react: 'render helpers',
			svelte: '{#snippet}, {@render}'
		},
		{
			title: 'Key Blocks',
			href: '/dashboard/key-blocks',
			icon: '🧩',
			description: 'Learn remounting patterns',
			react: 'key prop',
			svelte: '{#key ...}'
		},
		{
			title: 'Data Fetching',
			href: '/dashboard/data-fetching',
			icon: '🔄',
			description: 'Learn TanStack Query + load functions',
			react: 'useQuery, fetch in useEffect',
			svelte: 'load functions, createQuery'
		},
		{
			title: 'Async UI',
			href: '/dashboard/async-ui',
			icon: '🔄',
			description: 'Learn loading/error UI patterns',
			react: 'Suspense, loading states',
			svelte: '{#await}, load'
		},
		{
			title: 'Debugging',
			href: '/dashboard/debugging',
			icon: '⚡',
			description: 'Learn debugging patterns',
			react: 'DevTools, logs',
			svelte: '$inspect, logs'
		},
		{
			title: 'Routing',
			href: '/dashboard/routing',
			icon: '🛣️',
			description: 'Learn file-based routing vs React Router',
			react: 'react-router-dom',
			svelte: 'File-based routes'
		}
	];
</script>

<div class="overview">
	<!-- Welcome Section -->
	<section class="welcome-section">
		<div class="welcome-content">
			<h2>Welcome back, {authStore.user?.name || 'Developer'}! 👋</h2>
			<p>
				This interactive platform helps React developers learn Svelte 5 by comparing syntax
				side-by-side. Each section includes live demos and code comparisons.
			</p>
		</div>
		<div class="quick-stats">
			<div class="stat">
				<span class="stat-value">{sections.length}</span>
				<span class="stat-label">Sections</span>
			</div>
			<div class="stat">
				<span class="stat-value">∞</span>
				<span class="stat-label">Examples</span>
			</div>
			<div class="stat">
				<span class="stat-value">Svelte 5</span>
				<span class="stat-label">Version</span>
			</div>
		</div>
	</section>

	<!-- Quick Comparison -->
	<section class="quick-comparison">
		<h3>Quick Look: React vs Svelte</h3>
		<p class="section-desc">Here's the same component in both frameworks:</p>
		<CodeComparison
			title="Counter Component"
			reactCode={quickComparison.react}
			svelteCode={quickComparison.svelte}
		/>
	</section>

	<!-- Learning Sections Grid -->
	<section class="sections-grid">
		<h3>Learning Sections</h3>
		<p class="section-desc">Click on a section to dive deep into the topic:</p>
		<div class="grid">
			{#each sections as section (section.href)}
				<a href={section.href} class="section-card">
					<div class="card-header">
						<span class="card-icon">{section.icon}</span>
						<h4>{section.title}</h4>
					</div>
					<p class="card-description">{section.description}</p>
					<div class="card-comparison">
						<div class="comparison-item react">
							<span class="label">React:</span>
							<code>{section.react}</code>
						</div>
						<div class="comparison-item svelte">
							<span class="label">Svelte:</span>
							<code>{section.svelte}</code>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Key Differences Summary -->
	<section class="key-differences">
		<h3>Key Differences at a Glance</h3>
		<div class="differences-grid">
			<div class="difference">
				<h4>🔄 Reactivity Model</h4>
				<p>
					<strong>React:</strong> Explicit state updates trigger re-renders
				</p>
				<p>
					<strong>Svelte:</strong> Compile-time reactivity with fine-grained updates
				</p>
			</div>
			<div class="difference">
				<h4>📝 Syntax</h4>
				<p>
					<strong>React:</strong> JavaScript-first with JSX
				</p>
				<p>
					<strong>Svelte:</strong> HTML-first with enhanced templating
				</p>
			</div>
			<div class="difference">
				<h4>📦 Bundle Size</h4>
				<p>
					<strong>React:</strong> ~40KB runtime
				</p>
				<p>
					<strong>Svelte:</strong> No runtime (compiled away)
				</p>
			</div>
			<div class="difference">
				<h4>🎣 Hooks vs Runes</h4>
				<p>
					<strong>React:</strong> useState, useEffect, useMemo...
				</p>
				<p>
					<strong>Svelte:</strong> $state, $effect, $derived...
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.overview {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Welcome Section */
	.welcome-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 1rem;
		color: white;
		margin-bottom: 2rem;
	}

	.welcome-content h2 {
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
	}

	.welcome-content p {
		margin: 0;
		opacity: 0.9;
		line-height: 1.6;
	}

	.quick-stats {
		display: flex;
		gap: 2rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 0.75rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.stat-label {
		font-size: 0.8rem;
		opacity: 0.8;
	}

	/* Section Headers */
	h3 {
		margin: 0 0 0.5rem;
		font-size: 1.25rem;
		color: #1f2937;
	}

	.section-desc {
		margin: 0 0 1.5rem;
		color: #6b7280;
	}

	/* Quick Comparison */
	.quick-comparison {
		margin-bottom: 2rem;
	}

	/* Sections Grid */
	.sections-grid {
		margin-bottom: 2rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.section-card {
		display: block;
		padding: 1.5rem;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.section-card:hover {
		border-color: #667eea;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
		transform: translateY(-2px);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.card-icon {
		font-size: 1.5rem;
	}

	.card-header h4 {
		margin: 0;
		color: #1f2937;
		font-size: 1rem;
	}

	.card-description {
		margin: 0 0 1rem;
		color: #6b7280;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.card-comparison {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.comparison-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
	}

	.comparison-item .label {
		font-weight: 500;
		color: #6b7280;
	}

	.comparison-item code {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.75rem;
		padding: 0.2rem 0.4rem;
		background: #f3f4f6;
		border-radius: 0.25rem;
	}

	.comparison-item.react code {
		color: #3b82f6;
	}

	.comparison-item.svelte code {
		color: #ff3e00;
	}

	/* Key Differences */
	.key-differences {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid #e5e7eb;
	}

	.differences-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.difference {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.difference h4 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: #1f2937;
	}

	.difference p {
		margin: 0.5rem 0 0;
		font-size: 0.85rem;
		color: #6b7280;
		line-height: 1.4;
	}

	.difference strong {
		color: #374151;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.welcome-section {
			flex-direction: column;
			text-align: center;
		}

		.quick-stats {
			justify-content: center;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
