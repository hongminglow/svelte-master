<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { debuggingExamples } from '$lib/code-examples';

	let name = $state('Ada');
	let clicks = $state(0);
	let doubled = $derived(clicks * 2);

	// Dev-only reactive logging
	$inspect(name, clicks, doubled);
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			In React you typically <code>console.log</code> inside renders/effects or use the React
			DevTools. In Svelte 5 you can use <code>$inspect</code> and <code>$inspect.trace</code> to log reactive
			values as they change.
		</p>
	</div>

	<div class="example">
		<h2>Live Demo: $inspect</h2>
		<div class="demo-box">
			<p class="hint">Open DevTools console to see logs.</p>

			<label class="row">
				<span>Name</span>
				<input bind:value={name} />
			</label>

			<div class="row">
				<button onclick={() => clicks--}>-</button>
				<button onclick={() => clicks++}>+</button>
				<button onclick={() => (clicks = 0)}>Reset</button>
			</div>

			<p class="summary"><strong>clicks:</strong> {clicks} • <strong>doubled:</strong> {doubled}</p>
		</div>

		<CodeComparison
			title="Debugging reactive values"
			reactCode={debuggingExamples.inspect.react}
			svelteCode={debuggingExamples.inspect.svelte}
		/>

		<div class="callout info">
			<h4>Notes</h4>
			<ul>
				<li><code>$inspect(...)</code> runs only in development builds.</li>
				<li>
					Don’t mutate <code>$state</code> inside <code>$inspect</code> callbacks (it can cause warnings).
				</li>
				<li><code>$inspect.trace(...)</code> helps you track why reactive code re-ran.</li>
			</ul>
		</div>
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

	.hint {
		margin: 0 0 0.75rem;
		color: #6b7280;
		font-size: 0.9rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.75rem 0;
	}

	.row span {
		width: 60px;
		color: #6b7280;
		font-size: 0.9rem;
	}

	input {
		flex: 1;
		padding: 0.6rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
	}

	button {
		padding: 0.6rem 0.9rem;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.summary {
		margin: 0.75rem 0 0;
		color: #374151;
	}

	.callout {
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 0.75rem;
	}

	.callout.info {
		background: #eff6ff;
		border: 1px solid #bfdbfe;
	}

	.callout h4 {
		margin: 0 0 0.5rem;
	}

	.callout ul {
		margin: 0;
		padding-left: 1.2rem;
		color: #374151;
	}
</style>
