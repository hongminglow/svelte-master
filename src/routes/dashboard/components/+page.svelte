<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { componentExamples } from '$lib/code-examples';

	// Interactive Demo State
	let isLoggedIn = $state(false);
	let isAdmin = $state(false);

	let todos = $state([
		{ id: 1, text: 'Learn React basics', done: true },
		{ id: 2, text: 'Learn Svelte 5', done: false },
		{ id: 3, text: 'Build a project', done: false }
	]);

	let formValue = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert(`Submitted: ${formValue}`);
		formValue = '';
	}
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			Svelte uses an HTML-first template syntax with special blocks for conditionals and loops.
			React uses JSX, which is JavaScript-first. Both approaches have their strengths!
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>🔀 #if / :else</h3>
				<p>Conditional rendering blocks.</p>
			</div>
			<div class="concept">
				<h3>🔁 #each</h3>
				<p>Loop over arrays with optional key.</p>
			</div>
			<div class="concept">
				<h3>📝 Event Handlers</h3>
				<p>Use onclick, onsubmit (lowercase).</p>
			</div>
			<div class="concept">
				<h3>✨ Event Modifiers</h3>
				<p>|preventDefault, |stopPropagation</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Conditional Rendering -->
	<div class="example">
		<h2>Example 1: Conditional Rendering</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="conditional-demo">
				<div class="toggle-controls">
					<label>
						<input type="checkbox" bind:checked={isLoggedIn} />
						Logged In
					</label>
					<label>
						<input type="checkbox" bind:checked={isAdmin} disabled={!isLoggedIn} />
						Admin
					</label>
				</div>
				<div class="demo-output">
					{#if isLoggedIn && isAdmin}
						<div class="status admin">🔒 Super Admin Access</div>
					{:else if isLoggedIn}
						<div class="status user">👤 User Access</div>
					{:else}
						<div class="status guest">🚪 Please log in</div>
					{/if}
				</div>
			</div>
		</div>
		<CodeComparison
			title="Conditional Rendering"
			reactCode={componentExamples.conditionalRendering.react}
			svelteCode={componentExamples.conditionalRendering.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				React uses ternaries and <code>&amp;&amp;</code> operators inside JSX. Svelte has dedicated
				<code>#if</code>, <code>:else if</code>, <code>:else</code> blocks that are more readable for
				complex conditions.
			</p>
		</div>
	</div>

	<!-- Example 2: List Rendering -->
	<div class="example">
		<h2>Example 2: List Rendering</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="list-demo">
				<ul class="todo-list">
					{#each todos as todo, index (todo.id)}
						<li class:done={todo.done}>
							<span class="index">{index + 1}.</span>
							<label>
								<input type="checkbox" bind:checked={todo.done} />
								<span>{todo.text}</span>
							</label>
						</li>
					{:else}
						<li class="empty">No todos yet!</li>
					{/each}
				</ul>
			</div>
		</div>
		<CodeComparison
			title="List Rendering"
			reactCode={componentExamples.listRendering.react}
			svelteCode={componentExamples.listRendering.svelte}
		/>
		<div class="callout info">
			<h4>📝 #each Syntax</h4>
			<ul>
				<li><code>#each items as item</code> - Basic iteration</li>
				<li><code>#each items as item, index</code> - With index</li>
				<li><code>#each items as item (item.id)</code> - With key expression</li>
				<li><code>:else</code> - Shown when array is empty</li>
			</ul>
		</div>
	</div>

	<!-- Example 3: Event Handling -->
	<div class="example">
		<h2>Example 3: Event Handling</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="form-demo">
				<form onsubmit={handleSubmit}>
					<input type="text" bind:value={formValue} placeholder="Type something..." />
					<button type="submit">Submit</button>
				</form>
				<p class="form-hint">Value: "{formValue}"</p>
			</div>
		</div>
		<CodeComparison
			title="Event Handling"
			reactCode={componentExamples.eventHandling.react}
			svelteCode={componentExamples.eventHandling.svelte}
		/>
		<div class="callout">
			<h4>💡 Event Modifiers</h4>
			<p>
				Svelte has event modifiers like <code>|preventDefault</code> and
				<code>|stopPropagation</code>
				that you can chain: <code>onclick|preventDefault|stopPropagation</code>. No equivalent in
				React!
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
					<th>Svelte</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>&#123;cond ? &lt;A/&gt; : &lt;B/&gt;&#125;</code></td>
					<td><code>&#123;#if cond&#125;...&#123;:else&#125;...&#123;/if&#125;</code></td>
				</tr>
				<tr>
					<td><code>&#123;cond &amp;&amp; &lt;A/&gt;&#125;</code></td>
					<td><code>&#123;#if cond&#125;...&#123;/if&#125;</code></td>
				</tr>
				<tr>
					<td><code>arr.map(item =&gt; ...)</code></td>
					<td><code>&#123;#each arr as item&#125;...&#123;/each&#125;</code></td>
				</tr>
				<tr>
					<td><code>onClick=&#123;handler&#125;</code></td>
					<td><code>onclick=&#123;handler&#125;</code></td>
				</tr>
				<tr>
					<td><code>e.preventDefault()</code></td>
					<td><code>onclick|preventDefault</code></td>
				</tr>
				<tr>
					<td><code>className="..."</code></td>
					<td><code>class="..."</code></td>
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

	/* Conditional Demo */
	.conditional-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toggle-controls {
		display: flex;
		gap: 1.5rem;
	}

	.toggle-controls label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.toggle-controls input {
		width: 18px;
		height: 18px;
	}

	.demo-output {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.status {
		padding: 1rem;
		border-radius: 0.5rem;
		font-weight: 500;
		text-align: center;
	}

	.status.admin {
		background: #dcfce7;
		color: #166534;
	}

	.status.user {
		background: #dbeafe;
		color: #1e40af;
	}

	.status.guest {
		background: #f3f4f6;
		color: #6b7280;
	}

	/* List Demo */
	.todo-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.todo-list li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.todo-list li.done span:last-child {
		text-decoration: line-through;
		color: #9ca3af;
	}

	.todo-list .index {
		font-weight: 600;
		color: #6b7280;
		min-width: 24px;
	}

	.todo-list label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		flex: 1;
	}

	.todo-list input[type='checkbox'] {
		width: 18px;
		height: 18px;
	}

	.todo-list .empty {
		color: #9ca3af;
		text-align: center;
		padding: 2rem;
	}

	/* Form Demo */
	.form-demo form {
		display: flex;
		gap: 0.5rem;
	}

	.form-demo input {
		flex: 1;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	.form-demo button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
	}

	.form-hint {
		margin: 1rem 0 0;
		color: #6b7280;
		font-size: 0.9rem;
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
