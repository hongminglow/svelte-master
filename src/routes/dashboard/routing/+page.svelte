<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { routingExamples } from '$lib/code-examples';
	import { page } from '$app/state';
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			SvelteKit uses file-based routing - your folder structure <em>is</em> your routes. No router configuration
			needed! This is similar to Next.js but with some unique features.
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>📁 File-based</h3>
				<p>Folders = routes, files = pages/layouts.</p>
			</div>
			<div class="concept">
				<h3>🔗 [param]</h3>
				<p>Dynamic routes with brackets.</p>
			</div>
			<div class="concept">
				<h3>📐 +layout.svelte</h3>
				<p>Shared layouts that wrap pages.</p>
			</div>
			<div class="concept">
				<h3>🚀 goto()</h3>
				<p>Programmatic navigation function.</p>
			</div>
		</div>
	</div>

	<!-- File Structure Visual -->
	<div class="example">
		<h2>SvelteKit Route Structure</h2>
		<div class="file-tree">
			<h4>📁 src/routes/</h4>
			<pre><code
					>src/routes/
├── +page.svelte              → /
├── +layout.svelte            → (wraps all pages)
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/
│       ├── +page.svelte      → /blog/:slug
│       └── +page.server.ts   → (server data)
├── dashboard/
│   ├── +layout.svelte        → (dashboard layout)
│   ├── +page.svelte          → /dashboard
│   └── settings/
│       └── +page.svelte      → /dashboard/settings
└── api/
    └── users/
        └── +server.ts        → API: /api/users</code
				></pre>
		</div>
		<div class="callout info">
			<h4>📝 File Naming Convention</h4>
			<ul>
				<li><code>+page.svelte</code> - Page component</li>
				<li><code>+page.ts</code> - Universal load function</li>
				<li><code>+page.server.ts</code> - Server-only load function</li>
				<li><code>+layout.svelte</code> - Layout component</li>
				<li><code>+server.ts</code> - API endpoint</li>
				<li><code>+error.svelte</code> - Error boundary</li>
			</ul>
		</div>
	</div>

	<!-- Example 1: Basic Routing -->
	<div class="example">
		<h2>Example 1: Basic Navigation</h2>
		<div class="demo-box">
			<h3>Current Route Info</h3>
			<div class="route-info">
				<div class="info-row">
					<span class="label">pathname:</span>
					<code>{page.url.pathname}</code>
				</div>
				<div class="info-row">
					<span class="label">href:</span>
					<code>{page.url.href}</code>
				</div>
			</div>
		</div>
		<CodeComparison
			title="Basic Routing"
			reactCode={routingExamples.basicRouting.react}
			svelteCode={routingExamples.basicRouting.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				React Router requires setup with <code>&lt;BrowserRouter&gt;</code> and
				<code>&lt;Routes&gt;</code>. SvelteKit routing is <strong>automatic</strong> based on your file
				structure!
			</p>
		</div>
	</div>

	<!-- Example 2: Dynamic Routes -->
	<div class="example">
		<h2>Example 2: Dynamic Routes</h2>
		<CodeComparison
			title="Dynamic Routes"
			reactCode={routingExamples.dynamicRoutes.react}
			svelteCode={routingExamples.dynamicRoutes.svelte}
		/>
		<div class="pattern-example">
			<h4>Route Patterns</h4>
			<table>
				<thead>
					<tr>
						<th>File Path</th>
						<th>URL</th>
						<th>Params</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>users/[id]/+page.svelte</code></td>
						<td>/users/123</td>
						<td><code>params.id = "123"</code></td>
					</tr>
					<tr>
						<td><code>blog/[...slug]/+page.svelte</code></td>
						<td>/blog/2024/post</td>
						<td><code>params.slug = "2024/post"</code></td>
					</tr>
					<tr>
						<td><code>[[lang]]/about/+page.svelte</code></td>
						<td>/about or /en/about</td>
						<td><code>params.lang = undefined or "en"</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Example 3: Programmatic Navigation -->
	<div class="example">
		<h2>Example 3: Programmatic Navigation</h2>
		<CodeComparison
			title="Programmatic Navigation"
			reactCode={routingExamples.navigation.react}
			svelteCode={routingExamples.navigation.svelte}
		/>
		<div class="callout info">
			<h4>📝 Navigation Functions</h4>
			<ul>
				<li><code>goto('/path')</code> - Navigate to a route</li>
				<li><code>goto('/path', &#123; replaceState: true &#125;)</code> - Replace history</li>
				<li><code>invalidate('load:data')</code> - Re-run load functions</li>
				<li><code>invalidateAll()</code> - Re-run all load functions</li>
			</ul>
		</div>
	</div>

	<!-- Layouts -->
	<div class="example">
		<h2>Nested Layouts</h2>
		<div class="layout-visual">
			<div class="layout root">
				<span>+layout.svelte (root)</span>
				<div class="layout child">
					<span>dashboard/+layout.svelte</span>
					<div class="page">
						<span>+page.svelte (content)</span>
					</div>
				</div>
			</div>
		</div>
		<p class="caption">
			Layouts nest automatically! The dashboard layout wraps all /dashboard/* pages, and both are
			wrapped by the root layout.
		</p>
	</div>

	<!-- Quick Reference -->
	<div class="quick-reference">
		<h2>Quick Reference</h2>
		<table>
			<thead>
				<tr>
					<th>React Router</th>
					<th>SvelteKit</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>&lt;Link to="/path"&gt;</code></td>
					<td><code>&lt;a href="/path"&gt;</code></td>
				</tr>
				<tr>
					<td><code>useNavigate()</code></td>
					<td><code>import &#123; goto &#125; from '$app/navigation'</code></td>
				</tr>
				<tr>
					<td><code>useParams()</code></td>
					<td><code>page.params</code> or <code>data</code> from load</td>
				</tr>
				<tr>
					<td><code>useLocation()</code></td>
					<td><code>import &#123; page &#125; from '$app/state'</code></td>
				</tr>
				<tr>
					<td><code>&lt;Route path="/:id"&gt;</code></td>
					<td><code>[id]/+page.svelte</code> folder</td>
				</tr>
				<tr>
					<td><code>&lt;Outlet /&gt;</code></td>
					<td><code>&#123;@render children()&#125;</code></td>
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

	/* File Tree */
	.file-tree {
		background: #1f2937;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.file-tree h4 {
		margin: 0 0 1rem;
		color: #fbbf24;
		font-size: 1rem;
	}

	.file-tree pre {
		margin: 0;
		overflow-x: auto;
	}

	.file-tree code {
		color: #e5e7eb;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.85rem;
		line-height: 1.7;
	}

	/* Route Info */
	.route-info {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
	}

	.info-row {
		display: flex;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px dashed #e5e7eb;
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-row .label {
		font-weight: 600;
		color: #6b7280;
		min-width: 100px;
	}

	.info-row code {
		background: #e5e7eb;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		word-break: break-all;
	}

	/* Pattern Example */
	.pattern-example {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 1rem;
		margin-top: 1.5rem;
	}

	.pattern-example h4 {
		margin: 0 0 1rem;
		font-size: 1rem;
		color: #1f2937;
	}

	.pattern-example table {
		width: 100%;
		border-collapse: collapse;
	}

	.pattern-example th,
	.pattern-example td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.pattern-example th {
		font-weight: 600;
		color: #6b7280;
		font-size: 0.85rem;
	}

	.pattern-example td code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
	}

	/* Layout Visual */
	.layout-visual {
		padding: 1.5rem;
		background: #f9fafb;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
	}

	.layout {
		padding: 1rem;
		border: 2px dashed;
		border-radius: 0.5rem;
	}

	.layout.root {
		border-color: #667eea;
		background: rgba(102, 126, 234, 0.1);
	}

	.layout.child {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.1);
		margin-top: 1rem;
	}

	.page {
		padding: 1rem;
		border: 2px solid #f59e0b;
		border-radius: 0.5rem;
		background: rgba(245, 158, 11, 0.1);
		margin-top: 1rem;
		text-align: center;
	}

	.layout span {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.caption {
		color: #6b7280;
		font-size: 0.9rem;
		font-style: italic;
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

	.callout.info ul {
		margin: 0;
		padding-left: 1.25rem;
		color: #1e3a8a;
	}

	.callout.info li {
		margin: 0.25rem 0;
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
		font-size: 0.8rem;
	}
</style>
