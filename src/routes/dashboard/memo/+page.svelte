<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { memoExamples } from '$lib/code-examples';

	// Interactive Demo: Expensive computation
	let items = $state([
		{ id: 1, name: 'Apple', category: 'fruit' },
		{ id: 2, name: 'Banana', category: 'fruit' },
		{ id: 3, name: 'Carrot', category: 'vegetable' },
		{ id: 4, name: 'Broccoli', category: 'vegetable' },
		{ id: 5, name: 'Orange', category: 'fruit' }
	]);
	let filter = $state('');
	let computeCount = $state(0);

	// $derived automatically tracks dependencies
	const filteredItems = $derived.by(() => {
		computeCount++;
		return items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
	});

	const totalItems = $derived(items.length);
	const fruitCount = $derived(items.filter((i) => i.category === 'fruit').length);
	const vegetableCount = $derived(items.filter((i) => i.category === 'vegetable').length);

	// Demo: Computed values that depend on other computed values
	let price = $state(100);
	let quantity = $state(1);
	let taxRate = $state(0.1);

	const subtotal = $derived(price * quantity);
	const tax = $derived(subtotal * taxRate);
	const total = $derived(subtotal + tax);
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			In React, you use <code>useMemo</code> to cache computed values and <code>useCallback</code>
			to cache functions. In Svelte 5, <code>$derived</code> handles memoization automatically without
			dependency arrays!
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>🧮 $derived</h3>
				<p>Creates computed values that auto-update.</p>
			</div>
			<div class="concept">
				<h3>📊 $derived.by</h3>
				<p>For complex computations with a function.</p>
			</div>
			<div class="concept">
				<h3>🔗 Dependency Chain</h3>
				<p>Derived values can depend on other derived values.</p>
			</div>
			<div class="concept">
				<h3>⚡ No useCallback</h3>
				<p>Svelte functions are stable by default!</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Filtered List -->
	<div class="example">
		<h2>Example 1: Filtered List with $derived</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="filter-demo">
				<input type="text" bind:value={filter} placeholder="Filter items..." />
				<div class="stats">
					<span>Total: {totalItems}</span>
					<span>🍎 Fruits: {fruitCount}</span>
					<span>🥦 Vegetables: {vegetableCount}</span>
					<span class="compute-count">Computed: {computeCount}x</span>
				</div>
				<ul class="item-list">
					{#each filteredItems as item (item.id)}
						<li class="item" class:fruit={item.category === 'fruit'}>
							{item.category === 'fruit' ? '🍎' : '🥦'}
							{item.name}
						</li>
					{:else}
						<li class="no-items">No items match your filter</li>
					{/each}
				</ul>
			</div>
		</div>
		<CodeComparison
			title="Memoized Filtered List"
			reactCode={memoExamples.useMemo.react}
			svelteCode={memoExamples.useMemo.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				React's <code>useMemo</code> requires a dependency array <code>[items, filter]</code>.
				Svelte's <code>$derived</code> automatically tracks which reactive values you read and only recomputes
				when they change.
			</p>
		</div>
	</div>

	<!-- Example 2: Chained Computations -->
	<div class="example">
		<h2>Example 2: Chained Derived Values</h2>
		<div class="demo-box">
			<h3>Live Demo: Price Calculator</h3>
			<div class="price-demo">
				<div class="input-row">
					<label>
						Price: $
						<input type="number" bind:value={price} min="0" />
					</label>
					<label>
						Quantity:
						<input type="number" bind:value={quantity} min="1" />
					</label>
					<label>
						Tax Rate:
						<select bind:value={taxRate}>
							<option value={0}>0%</option>
							<option value={0.05}>5%</option>
							<option value={0.1}>10%</option>
							<option value={0.2}>20%</option>
						</select>
					</label>
				</div>
				<div class="price-breakdown">
					<div class="line">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div class="line">
						<span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
						<span>${tax.toFixed(2)}</span>
					</div>
					<div class="line total">
						<span>Total</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="code-snippet">
			<pre><code
					>// Derived values can depend on other derived values!
const subtotal = $derived(price * quantity);
const tax = $derived(subtotal * taxRate);
const total = $derived(subtotal + tax);</code
				></pre>
		</div>
		<div class="callout info">
			<h4>📝 How it works</h4>
			<p>
				When <code>price</code> changes, <code>subtotal</code> recalculates. This triggers
				<code>tax</code> and <code>total</code> to recalculate too. Svelte handles the dependency graph
				automatically!
			</p>
		</div>
	</div>

	<!-- Example 3: No useCallback needed -->
	<div class="example">
		<h2>Example 3: Functions (No useCallback Needed!)</h2>
		<CodeComparison
			title="Function Stability"
			reactCode={memoExamples.useCallback.react}
			svelteCode={memoExamples.useCallback.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				In React, you need <code>useCallback</code> to prevent unnecessary re-renders when passing functions
				as props. In Svelte, this is a non-issue because of fine-grained reactivity - child components
				only update when their specific props change, not when the parent re-renders.
			</p>
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
					<td><code>useMemo(() =&gt; x * 2, [x])</code></td>
					<td><code>$derived(x * 2)</code></td>
				</tr>
				<tr>
					<td><code>useMemo(() =&gt; complex(), [deps])</code></td>
					<td><code>$derived.by(() =&gt; complex())</code></td>
				</tr>
				<tr>
					<td><code>useCallback(fn, [deps])</code></td>
					<td><code>function fn() &#123;&#125;</code> (not needed!)</td>
				</tr>
				<tr>
					<td><code>React.memo(Component)</code></td>
					<td>Not needed (fine-grained updates)</td>
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

	/* Filter Demo */
	.filter-demo input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	.stats {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.compute-count {
		margin-left: auto;
		background: #fef3c7;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		color: #92400e;
	}

	.item-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.item {
		padding: 0.75rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.item.fruit {
		background: #fef3c7;
	}

	.no-items {
		padding: 2rem;
		text-align: center;
		color: #9ca3af;
	}

	/* Price Demo */
	.price-demo {
		max-width: 500px;
	}

	.input-row {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}

	.input-row label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.input-row input,
	.input-row select {
		padding: 0.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		font-size: 1rem;
		width: 100px;
	}

	.price-breakdown {
		background: #f9fafb;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.price-breakdown .line {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px dashed #e5e7eb;
	}

	.price-breakdown .line.total {
		border-bottom: none;
		font-weight: 700;
		font-size: 1.25rem;
		color: #16a34a;
		padding-top: 1rem;
		margin-top: 0.5rem;
		border-top: 2px solid #e5e7eb;
	}

	/* Code Snippet */
	.code-snippet {
		background: #1f2937;
		border-radius: 0.5rem;
		padding: 1rem;
		margin-bottom: 1.5rem;
		overflow-x: auto;
	}

	.code-snippet pre {
		margin: 0;
	}

	.code-snippet code {
		color: #e5e7eb;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9rem;
		line-height: 1.5;
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
