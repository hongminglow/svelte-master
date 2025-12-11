<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { dataFetchingExamples } from '$lib/code-examples';
	import { createQuery } from '@tanstack/svelte-query';

	// Demo: Using TanStack Query (Svelte 5 API requires a getter)
	const usersQuery = createQuery(() => ({
		queryKey: ['demo-users'],
		queryFn: async () => {
			// Simulate API delay
			await new Promise((r) => setTimeout(r, 1000));
			return [
				{ id: 1, name: 'Alice', email: 'alice@example.com' },
				{ id: 2, name: 'Bob', email: 'bob@example.com' },
				{ id: 3, name: 'Charlie', email: 'charlie@example.com' }
			];
		},
		staleTime: 30000
	}));
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			SvelteKit's <code>load</code> functions provide server-side data fetching out of the box. For client-side
			data fetching, TanStack Query works great with Svelte!
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>📥 +page.server.ts</h3>
				<p>Server-side data loading for SSR.</p>
			</div>
			<div class="concept">
				<h3>📤 +page.ts</h3>
				<p>Universal load (runs on server + client).</p>
			</div>
			<div class="concept">
				<h3>🔄 TanStack Query</h3>
				<p>Client-side caching & state management.</p>
			</div>
			<div class="concept">
				<h3>⚡ No useEffect</h3>
				<p>Load functions replace fetching in effects!</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Server Load Functions -->
	<div class="example">
		<h2>Example 1: Server Load Functions</h2>
		<CodeComparison
			title="Server-side Data Fetching"
			reactCode={dataFetchingExamples.serverLoad.react}
			svelteCode={dataFetchingExamples.serverLoad.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Advantage</h4>
			<p>
				With SvelteKit's <code>load</code> functions, data is fetched on the server during SSR. No loading
				spinners on first paint! The data is already there when the page renders.
			</p>
		</div>
		<div class="file-structure">
			<h4>📁 SvelteKit File Structure</h4>
			<pre><code
					>src/routes/users/
├── +page.server.ts  <!-- Server-only data loading -->
├── +page.ts         <!-- Universal (SSR + client) -->
└── +page.svelte     <!-- Page component --></code
				></pre>
		</div>
	</div>

	<!-- Example 2: TanStack Query -->
	<div class="example">
		<h2>Example 2: TanStack Query (Same API as React Query!)</h2>
		<div class="demo-box">
			<h3>Live Demo: Users from TanStack Query</h3>
			<div class="query-demo">
				{#if usersQuery.isLoading}
					<div class="loading">
						<div class="spinner"></div>
						<p>Loading users...</p>
					</div>
				{:else if usersQuery.error}
					<div class="error">Error loading users</div>
				{:else if usersQuery.data}
					<ul class="user-list">
						{#each usersQuery.data as user (user.id)}
							<li class="user-card">
								<div class="avatar">{user.name[0]}</div>
								<div class="user-info">
									<span class="name">{user.name}</span>
									<span class="email">{user.email}</span>
								</div>
							</li>
						{/each}
					</ul>
					<p class="cache-info">Data is cached! Refresh won't re-fetch for 30 seconds.</p>
				{/if}
			</div>
		</div>
		<CodeComparison
			title="TanStack Query"
			reactCode={dataFetchingExamples.tanstackQuery.react}
			svelteCode={dataFetchingExamples.tanstackQuery.svelte}
		/>
		<div class="callout info">
			<h4>📝 Key Similarity</h4>
			<p>
				TanStack Query works almost identically in Svelte! The main difference is using
				<code>createQuery</code> instead of <code>useQuery</code>, and accessing state via
				<code>$query</code> (Svelte store syntax) instead of destructuring.
			</p>
		</div>
	</div>

	<!-- When to use what -->
	<div class="example">
		<h2>When to Use What?</h2>
		<div class="comparison-table">
			<div class="option">
				<h4>+page.server.ts</h4>
				<ul>
					<li>✅ SEO-critical data</li>
					<li>✅ Database queries</li>
					<li>✅ Secrets/API keys</li>
					<li>✅ Initial page data</li>
					<li>❌ Real-time updates</li>
				</ul>
			</div>
			<div class="option">
				<h4>+page.ts (Universal)</h4>
				<ul>
					<li>✅ Public API calls</li>
					<li>✅ Runs on server + client</li>
					<li>✅ Client-side navigation</li>
					<li>❌ Secrets (exposed to client)</li>
				</ul>
			</div>
			<div class="option">
				<h4>TanStack Query</h4>
				<ul>
					<li>✅ Real-time/polling data</li>
					<li>✅ Infinite scroll</li>
					<li>✅ Optimistic updates</li>
					<li>✅ Background refetching</li>
					<li>❌ SSR (without hydration setup)</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Quick Reference -->
	<div class="quick-reference">
		<h2>Quick Reference</h2>
		<table>
			<thead>
				<tr>
					<th>React</th>
					<th>SvelteKit</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>useEffect + fetch</code></td>
					<td><code>+page.server.ts load()</code></td>
				</tr>
				<tr>
					<td><code>useQuery()</code></td>
					<td><code>createQuery()</code></td>
				</tr>
				<tr>
					<td><code>&#123; data, isLoading &#125;</code></td>
					<td><code>$query.data, $query.isLoading</code></td>
				</tr>
				<tr>
					<td><code>getServerSideProps</code></td>
					<td><code>+page.server.ts</code></td>
				</tr>
				<tr>
					<td><code>getStaticProps</code></td>
					<td><code>+page.ts + prerender</code></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.section {
		max-width: 900px;
	}

	.intro {
		margin-bottom: 2rem;
	}

	.lead {
		font-size: 1.1rem;
		line-height: 1.7;
		color: #4b5563;
	}

	.lead code {
		background: #fef3c7;
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.95em;
	}

	.key-concepts {
		margin-bottom: 2rem;
	}

	.key-concepts h2 {
		margin: 0 0 1rem;
		color: #1f2937;
	}

	.concept-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.concept {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.concept h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	.concept p {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.example {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.example h2 {
		margin: 0 0 1.5rem;
		color: #1f2937;
		font-size: 1.25rem;
	}

	.demo-box {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.demo-box h3 {
		margin: 0 0 1rem;
		font-size: 0.9rem;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Query Demo */
	.query-demo {
		min-height: 200px;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		color: #6b7280;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid #e5e7eb;
		border-top-color: #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error {
		padding: 2rem;
		text-align: center;
		color: #dc2626;
		background: #fee2e2;
		border-radius: 0.5rem;
	}

	.user-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}

	.user-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.user-card .avatar {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-info .name {
		font-weight: 600;
		color: #1f2937;
	}

	.user-info .email {
		font-size: 0.85rem;
		color: #6b7280;
	}

	.cache-info {
		margin: 1rem 0 0;
		padding: 0.75rem;
		background: #dcfce7;
		border-radius: 0.5rem;
		color: #166534;
		font-size: 0.85rem;
		text-align: center;
	}

	/* File Structure */
	.file-structure {
		background: #1f2937;
		border-radius: 0.5rem;
		padding: 1rem 1.5rem;
		margin-top: 1.5rem;
	}

	.file-structure h4 {
		margin: 0 0 1rem;
		color: #e5e7eb;
		font-size: 0.9rem;
	}

	.file-structure pre {
		margin: 0;
	}

	.file-structure code {
		color: #a5b4fc;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.85rem;
		line-height: 1.6;
	}

	/* Comparison Table */
	.comparison-table {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.option {
		padding: 1.5rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.option h4 {
		margin: 0 0 1rem;
		font-size: 1rem;
		color: #667eea;
	}

	.option ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.option li {
		padding: 0.25rem 0;
		font-size: 0.9rem;
		color: #4b5563;
	}

	/* Callout */
	.callout {
		background: #fef3c7;
		border-left: 4px solid #f59e0b;
		padding: 1rem 1.5rem;
		border-radius: 0 0.5rem 0.5rem 0;
		margin-top: 1.5rem;
	}

	.callout.info {
		background: #eff6ff;
		border-left-color: #3b82f6;
	}

	.callout h4 {
		margin: 0 0 0.5rem;
		color: #92400e;
		font-size: 1rem;
	}

	.callout.info h4 {
		color: #1e40af;
	}

	.callout p {
		margin: 0;
		color: #78350f;
		line-height: 1.6;
	}

	.callout.info p {
		color: #1e3a8a;
	}

	.callout code {
		background: rgba(0, 0, 0, 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	/* Quick Reference */
	.quick-reference {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.quick-reference h2 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
	}

	.quick-reference table {
		width: 100%;
		border-collapse: collapse;
	}

	.quick-reference th,
	.quick-reference td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.quick-reference th {
		font-weight: 600;
		color: #6b7280;
		font-size: 0.85rem;
		text-transform: uppercase;
	}

	.quick-reference th:first-child {
		color: #3b82f6;
	}

	.quick-reference th:last-child {
		color: #ff3e00;
	}

	.quick-reference td code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
	}
</style>
