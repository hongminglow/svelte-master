<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { storesExamples } from '$lib/code-examples';
	import {
		decrementWritable,
		incrementWritable,
		resetWritable,
		writableCounter
	} from '$lib/stores/writable-counter';
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			Svelte has a built-in store API via <code>svelte/store</code>. The most common store is
			<code>writable</code>, which you can update from anywhere and subscribe to in components. In
			Svelte 5 you can also share module <code>$state</code>, but <code>writable</code> is still useful
			for streams and interop.
		</p>
	</div>

	<div class="example">
		<h2>Live Demo: Writable store</h2>
		<div class="demo-box">
			<div class="grid">
				<div class="panel">
					<h3>Panel A</h3>
					<p class="count">{$writableCounter.count}</p>
					<div class="row">
						<button onclick={decrementWritable}>-</button>
						<button onclick={incrementWritable}>+</button>
						<button onclick={resetWritable}>Reset</button>
					</div>
				</div>

				<div class="panel">
					<h3>Panel B</h3>
					<p class="count">{$writableCounter.count}</p>
					<div class="row">
						<button onclick={decrementWritable}>-</button>
						<button onclick={incrementWritable}>+</button>
						<button onclick={resetWritable}>Reset</button>
					</div>
				</div>
			</div>
		</div>

		<CodeComparison
			title="Global state"
			reactCode={storesExamples.globalState.react}
			svelteCode={storesExamples.globalState.svelte}
		/>

		<div class="callout info">
			<h4>Rule of thumb</h4>
			<ul>
				<li>
					Use <code>writable</code> for shared state that many components subscribe to.
				</li>
				<li>
					Use module <code>$state</code> for lightweight shared state you mutate synchronously.
				</li>
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

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.panel {
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1rem;
		background: #f9fafb;
	}

	h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: #111827;
	}

	.count {
		font-size: 2.25rem;
		font-weight: 800;
		margin: 0 0 0.75rem;
		color: #111827;
	}

	.row {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.6rem 0.9rem;
		border: 1px solid #e5e7eb;
		background: white;
		border-radius: 0.5rem;
		cursor: pointer;
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

	@media (max-width: 840px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
