<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { effectsExamples } from '$lib/code-examples';

	// Interactive Demo: Document Title Effect
	let count = $state(0);

	$effect(() => {
		document.title = `Count: ${count} | Effects Demo`;
		return () => {
			document.title = 'React → Svelte';
		};
	});

	// Interactive Demo: Timer with cleanup
	let seconds = $state(0);
	let isRunning = $state(false);

	$effect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			seconds++;
		}, 1000);

		// Cleanup function
		return () => clearInterval(interval);
	});

	function toggleTimer() {
		isRunning = !isRunning;
	}

	function resetTimer() {
		seconds = 0;
		isRunning = false;
	}

	// Interactive Demo: Local Storage sync
	let savedName = $state('');

	$effect(() => {
		// Read from localStorage on mount
		const saved = localStorage.getItem('demo-name');
		if (saved) savedName = saved;
	});

	$effect(() => {
		// Save to localStorage when name changes
		if (savedName) {
			localStorage.setItem('demo-name', savedName);
		}
	});
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			In React, <code>useEffect</code> handles side effects with explicit dependency arrays. Svelte
			5's
			<code>$effect</code> automatically tracks dependencies, making your code cleaner and less error-prone.
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>⚡ $effect</h3>
				<p>Runs after DOM updates. Auto-tracks dependencies!</p>
			</div>
			<div class="concept">
				<h3>🔄 Auto-tracking</h3>
				<p>No dependency array needed - Svelte figures it out.</p>
			</div>
			<div class="concept">
				<h3>🧹 Cleanup</h3>
				<p>Return a function for cleanup, just like React.</p>
			</div>
			<div class="concept">
				<h3>⏱️ $effect.pre</h3>
				<p>Runs before DOM updates (like useLayoutEffect).</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Basic Effect -->
	<div class="example">
		<h2>Example 1: Document Title Effect</h2>
		<div class="demo-box">
			<h3>Live Demo (Watch the browser tab title!)</h3>
			<div class="counter-demo">
				<p class="count-display">{count}</p>
				<div class="button-group">
					<button onclick={() => count--}>-</button>
					<button onclick={() => count++}>+</button>
				</div>
				<p class="hint">The browser tab title updates automatically!</p>
			</div>
		</div>
		<CodeComparison
			title="Document Title Effect"
			reactCode={effectsExamples.basicEffect.react}
			svelteCode={effectsExamples.basicEffect.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				React requires you to manually specify <code>[count]</code> in the dependency array.
				Svelte's <code>$effect</code> automatically knows to re-run when <code>count</code> changes because
				you're reading it inside the effect!
			</p>
		</div>
	</div>

	<!-- Example 2: Timer with Cleanup -->
	<div class="example">
		<h2>Example 2: Timer with Cleanup</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="timer-demo">
				<p class="timer-display">
					{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(
						2,
						'0'
					)}
				</p>
				<div class="button-group">
					<button onclick={toggleTimer} class:running={isRunning}>
						{isRunning ? '⏸️ Pause' : '▶️ Start'}
					</button>
					<button onclick={resetTimer}>🔄 Reset</button>
				</div>
			</div>
		</div>
		<CodeComparison
			title="Timer with Cleanup"
			reactCode={effectsExamples.cleanup.react}
			svelteCode={effectsExamples.cleanup.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Similarity</h4>
			<p>
				Cleanup works the same way in both! Return a function from your effect, and it will run
				before the effect re-runs or when the component unmounts.
			</p>
		</div>
	</div>

	<!-- Example 3: LocalStorage Sync -->
	<div class="example">
		<h2>Example 3: LocalStorage Persistence</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="storage-demo">
				<input type="text" bind:value={savedName} placeholder="Type your name..." />
				<p>
					{#if savedName}
						Hello, <strong>{savedName}</strong>! Your name is saved to localStorage.
					{:else}
						Enter your name above. It will persist across page reloads!
					{/if}
				</p>
			</div>
		</div>
		<div class="callout info">
			<h4>📝 Effect Use Cases</h4>
			<ul>
				<li>DOM manipulation (document.title, focus, scroll)</li>
				<li>Browser APIs (localStorage, sessionStorage)</li>
				<li>Subscriptions (WebSocket, event listeners)</li>
				<li>Timers and intervals</li>
				<li>Third-party library integration</li>
			</ul>
		</div>
	</div>

	<!-- Example 4: $effect.pre -->
	<div class="example">
		<h2>Example 4: $effect.pre (useLayoutEffect equivalent)</h2>
		<CodeComparison
			title="Pre-render Effect"
			reactCode={effectsExamples.effectPre.react}
			svelteCode={effectsExamples.effectPre.svelte}
		/>
		<div class="callout">
			<h4>💡 When to use $effect.pre</h4>
			<p>
				Use <code>$effect.pre</code> when you need to run code <em>before</em> the DOM updates. This is
				useful for measurements, scroll position restoration, or animations.
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
					<td><code>useEffect(() =&gt; &#123; ... &#125;, [deps])</code></td>
					<td><code>$effect(() =&gt; &#123; ... &#125;)</code></td>
				</tr>
				<tr>
					<td><code>useEffect(() =&gt; &#123; ... &#125;, [])</code></td>
					<td><code>$effect(() =&gt; &#123; ... &#125;) // no reactive vars</code></td>
				</tr>
				<tr>
					<td><code>useLayoutEffect(() =&gt; ...)</code></td>
					<td><code>$effect.pre(() =&gt; ...)</code></td>
				</tr>
				<tr>
					<td><code>return () =&gt; cleanup()</code></td>
					<td><code>return () =&gt; cleanup()</code></td>
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

	/* Key Concepts */
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

	/* Examples */
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

	/* Demo Box */
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

	/* Counter Demo */
	.counter-demo {
		text-align: center;
	}

	.count-display {
		font-size: 4rem;
		font-weight: 700;
		margin: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hint {
		margin: 1rem 0 0;
		color: #9ca3af;
		font-size: 0.9rem;
	}

	/* Timer Demo */
	.timer-demo {
		text-align: center;
	}

	.timer-display {
		font-size: 4rem;
		font-weight: 700;
		margin: 0;
		font-family: 'Monaco', 'Menlo', monospace;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Storage Demo */
	.storage-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
	}

	.storage-demo input {
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	.storage-demo p {
		margin: 0;
		color: #4b5563;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.button-group button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
		background: #f3f4f6;
		color: #374151;
	}

	.button-group button:hover {
		transform: scale(1.05);
	}

	.button-group button.running {
		background: #fef3c7;
		color: #92400e;
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
		font-size: 0.85rem;
	}
</style>
