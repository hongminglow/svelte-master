<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { asyncUiExamples } from '$lib/code-examples';

	function sleep(ms: number) {
		return new Promise<void>((resolve) => setTimeout(resolve, ms));
	}

	// Await expressions (experimental.async)
	let a = $state(1);
	let b = $state(2);

	async function add(x: number, y: number) {
		await sleep(500);
		return x + y;
	}

	// Demonstrate synchronized updates + $state.eager
	let pathname = $state('/');

	async function resolvePath(p: string) {
		await sleep(800);
		return p;
	}

	// {#await} block demo
	let request = $state<Promise<string> | null>(null);

	async function fetchGreeting() {
		await sleep(900);
		if (Math.random() < 0.25) throw new Error('Random failure');
		return `Hello at ${new Date().toLocaleTimeString()}`;
	}
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			Svelte can render async work with <code>{'{#await ...}'} </code> blocks, and (with
			<code>experimental.async</code>) even inline <code>await</code> expressions. When an <code>await</code>
			expression depends on state, Svelte synchronizes updates to avoid inconsistent UI — and
			<code>$state.eager</code> lets you opt out for immediate feedback.
		</p>
	</div>

	<div class="example">
		<h2>Await Expressions + $state.eager</h2>
		<div class="demo-box">
			<div class="row">
				<label>
					<span>a</span>
					<input type="number" bind:value={a} />
				</label>
				<label>
					<span>b</span>
					<input type="number" bind:value={b} />
				</label>
			</div>

			<p class="calc">{a} + {b} = {await add(a, b)}</p>

			<div class="divider"></div>

			<div class="row">
				<button onclick={() => (pathname = '/')}>/</button>
				<button onclick={() => (pathname = '/about')}>/about</button>
				<button onclick={() => (pathname = '/docs')}>/docs</button>
			</div>

			<p class="summary"><strong>Selected (coordinated):</strong> {pathname}</p>
			<p class="summary"><strong>Selected (eager):</strong> {$state.eager(pathname)}</p>
			<p class="summary"><strong>Selected (await):</strong> {await resolvePath(pathname)}</p>

			<div class="callout info">
				<h4>What you should notice</h4>
				<ul>
					<li>
						Because <code>pathname</code> is used by an <code>await</code> expression, updates to
						<code>pathname</code> are synchronized.
					</li>
					<li>
						<code>$state.eager(pathname)</code> updates immediately, which is useful for UI feedback.
					</li>
				</ul>
			</div>
		</div>

		<CodeComparison
			title="Await expressions and $state.eager"
			reactCode={asyncUiExamples.eager.react}
			svelteCode={asyncUiExamples.eager.svelte}
		/>
	</div>

	<div class="example">
		<h2>{'{#await}'} Blocks</h2>
		<div class="demo-box">
			<button onclick={() => (request = fetchGreeting())}>Start request</button>

			{#if request}
				{#await request}
					<p class="pending">Loading…</p>
				{:then message}
					<p class="ok">{message}</p>
				{:catch err}
					<p class="err">Error: {err instanceof Error ? err.message : String(err)}</p>
				{/await}
			{/if}
		</div>

		<CodeComparison
			title="Async UI"
			reactCode={asyncUiExamples.awaitBlock.react}
			svelteCode={asyncUiExamples.awaitBlock.svelte}
		/>
	</div>
</div>

<style>
	.section {
		max-width: 900px;
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

	.demo-box {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1rem;
	}

	.row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		align-items: end;
		margin-bottom: 0.75rem;
	}

	label {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	label span {
		color: #6b7280;
		font-size: 0.9rem;
		width: 16px;
	}

	input {
		padding: 0.6rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		width: 120px;
	}

	button {
		padding: 0.6rem 0.9rem;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.calc {
		margin: 0.5rem 0 0;
		color: #111827;
		font-size: 1.05rem;
		font-weight: 600;
	}

	.divider {
		height: 1px;
		background: #e5e7eb;
		margin: 1rem 0;
	}

	.summary {
		margin: 0.35rem 0;
		color: #374151;
	}

	.pending {
		color: #6b7280;
	}

	.ok {
		color: #065f46;
	}

	.err {
		color: #b91c1c;
	}

	.callout {
		margin-top: 0.75rem;
		padding: 0.75rem;
		border-radius: 0.75rem;
	}

	.callout.info {
		background: #eff6ff;
		border: 1px solid #bfdbfe;
	}

	.callout h4 {
		margin: 0 0 0.35rem;
	}

	.callout ul {
		margin: 0;
		padding-left: 1.2rem;
		color: #374151;
	}
</style>
