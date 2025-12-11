<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { propsExamples } from '$lib/code-examples';
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			In React, props are passed as a function parameter object. In Svelte 5, you use the
			<code>$props()</code> rune to declare and destructure props. Svelte also supports two-way
			binding with <code>$bindable()</code>!
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>📦 $props()</h3>
				<p>Declare component props with destructuring.</p>
			</div>
			<div class="concept">
				<h3>🔗 $bindable()</h3>
				<p>Enable two-way binding for props.</p>
			</div>
			<div class="concept">
				<h3>✨ children snippet</h3>
				<p>Replaces React's children prop.</p>
			</div>
			<div class="concept">
				<h3>📝 Default values</h3>
				<p>Use JavaScript destructuring defaults.</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Basic Props -->
	<div class="example">
		<h2>Example 1: Basic Props with TypeScript</h2>
		<CodeComparison
			title="Component Props"
			reactCode={propsExamples.basicProps.react}
			svelteCode={propsExamples.basicProps.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Differences</h4>
			<ul>
				<li>
					<strong>Declaration:</strong> React uses function parameters, Svelte uses
					<code>$props()</code>
				</li>
				<li><strong>Types:</strong> Both support TypeScript interfaces</li>
				<li><strong>Defaults:</strong> Both use destructuring defaults</li>
				<li><strong>Class binding:</strong> Svelte uses <code>class:name</code> directive</li>
			</ul>
		</div>
	</div>

	<!-- Example 2: Children/Slots -->
	<div class="example">
		<h2>Example 2: Children (Snippets in Svelte)</h2>
		<CodeComparison
			title="Children/Slots"
			reactCode={propsExamples.childrenProps.react}
			svelteCode={propsExamples.childrenProps.svelte}
		/>
		<div class="callout info">
			<h4>📝 Svelte 5 Snippets</h4>
			<p>
				In Svelte 5, <code>children</code> is a special snippet that represents content passed
				between component tags. Use <code>@render children()</code> to render it. This replaced the
				older
				<code>&lt;slot&gt;</code> syntax.
			</p>
		</div>
	</div>

	<!-- Example 3: Two-way Binding -->
	<div class="example">
		<h2>Example 3: Two-way Binding with $bindable</h2>
		<CodeComparison
			title="Bindable Props"
			reactCode={propsExamples.bindableProps.react}
			svelteCode={propsExamples.bindableProps.svelte}
		/>
		<div class="callout">
			<h4>💡 Game Changer!</h4>
			<p>
				React requires passing both <code>value</code> and <code>onChange</code> for controlled
				inputs. Svelte's <code>bind:</code> directive enables true two-way binding. Use
				<code>$bindable()</code>
				in child components to allow parents to bind to props!
			</p>
		</div>
	</div>

	<!-- Live Demo -->
	<div class="example">
		<h2>Interactive Demo: Props in Action</h2>
		<div class="demo-box">
			<h3>Greeting Component</h3>
			<GreetingDemo />
		</div>
	</div>

	<!-- Quick Reference -->
	<div class="quick-reference">
		<h2>Quick Reference</h2>
		<table>
			<thead>
				<tr>
					<th>React</th>
					<th>Svelte 5</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>function Comp(&#123; prop &#125;)</code></td>
					<td><code>let &#123; prop &#125; = $props()</code></td>
				</tr>
				<tr>
					<td><code>&#123; prop = 'default' &#125;</code></td>
					<td><code>&#123; prop = 'default' &#125; = $props()</code></td>
				</tr>
				<tr>
					<td><code>&#123; children &#125;</code></td>
					<td><code>&#123; children &#125; = $props()</code></td>
				</tr>
				<tr>
					<td><code>&#123;children&#125;</code></td>
					<td><code>&#123;@render children()&#125;</code></td>
				</tr>
				<tr>
					<td><code>value + onChange</code></td>
					<td><code>$bindable() + bind:prop</code></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!-- Nested component for demo -->
{#snippet GreetingDemo()}
	{@const name = 'Developer'}
	{@const showAge = true}
	<div class="greeting-demo">
		<div class="demo-card">
			<div class="demo-props">
				<strong>Props passed:</strong>
				<code>name="{name}" showAge=&#123;{showAge}&#125;</code>
			</div>
			<div class="demo-output">
				<strong>Output:</strong>
				<span>Hello, {name}! {showAge ? '(Age shown)' : ''}</span>
			</div>
		</div>
	</div>
{/snippet}

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

	.greeting-demo {
		padding: 1rem;
	}

	.demo-card {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
	}

	.demo-props,
	.demo-output {
		padding: 0.5rem 0;
	}

	.demo-props code {
		background: #e5e7eb;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		margin-left: 0.5rem;
	}

	.demo-output span {
		margin-left: 0.5rem;
		color: #16a34a;
		font-weight: 500;
	}

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

	.callout p,
	.callout li {
		margin: 0;
		color: #78350f;
		line-height: 1.6;
	}

	.callout.info p {
		color: #1e3a8a;
	}

	.callout ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.callout li {
		margin: 0.25rem 0;
	}

	.callout code {
		background: rgba(0, 0, 0, 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

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
