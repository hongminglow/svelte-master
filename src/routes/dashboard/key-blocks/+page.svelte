<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import KeyedInput from '$lib/components/KeyedInput.svelte';
	import { keyBlockExamples } from '$lib/code-examples';

	let key = $state(0);
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			React’s <code>key</code> prop forces a component to remount. Svelte has a dedicated
			<code>{'{#key ...}'} </code> block that destroys and recreates its contents whenever the key expression
			changes.
		</p>
	</div>

	<div class="example">
		<h2>Live Demo: Remount on key change</h2>
		<div class="demo-box">
			<div class="row">
				<button onclick={() => key++}>Remount keyed block</button>
				<span class="meta">key = {key}</span>
			</div>

			<div class="grid">
				<div>
					<h3>Without {'{#key}'}</h3>
					<KeyedInput label="This keeps its internal state" />
				</div>

				<div>
					<h3>With {'{#key}'}</h3>
					{#key key}
						<KeyedInput label="This resets when key changes" />
					{/key}
				</div>
			</div>
		</div>

		<CodeComparison
			title="Forcing a remount"
			reactCode={keyBlockExamples.remount.react}
			svelteCode={keyBlockExamples.remount.svelte}
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
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	button {
		padding: 0.6rem 0.9rem;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.meta {
		color: #6b7280;
		font-size: 0.9rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: #111827;
	}

	@media (max-width: 840px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
