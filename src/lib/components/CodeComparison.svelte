<!--
  CodeComparison Component - Side-by-side React vs Svelte code display

  This component demonstrates several Svelte 5 patterns:
  - $props() rune for receiving props
  - Default values with destructuring
  - {#snippet} for reusable template fragments (new in Svelte 5)
  - Conditional rendering with {#if}
  - Scoped styles (CSS is scoped to this component by default)
-->
<script lang="ts">
	interface Props {
		title: string;
		reactCode: string;
		svelteCode: string;
		reactLabel?: string;
		svelteLabel?: string;
		description?: string;
	}

	// $props() rune with destructuring and default values
	// In React, this would be: function CodeComparison({ title, reactCode, svelteCode, reactLabel = 'React', ... })
	let {
		title,
		reactCode,
		svelteCode,
		reactLabel = 'React',
		svelteLabel = 'Svelte 5',
		description = ''
	}: Props = $props();
</script>

<section class="comparison">
	<h3>{title}</h3>

	{#if description}
		<p class="description">{description}</p>
	{/if}

	<div class="code-grid">
		<div class="code-block react">
			<div class="code-header">
				<span class="badge react-badge">{reactLabel}</span>
			</div>
			<pre><code>{reactCode}</code></pre>
		</div>

		<div class="code-block svelte">
			<div class="code-header">
				<span class="badge svelte-badge">{svelteLabel}</span>
			</div>
			<pre><code>{svelteCode}</code></pre>
		</div>
	</div>
</section>

<style>
	.comparison {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: white;
		border-radius: 0.75rem;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.1),
			0 1px 2px rgba(0, 0, 0, 0.06);
	}

	h3 {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
	}

	.description {
		margin: 0 0 1rem 0;
		color: #6b7280;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.code-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	@media (max-width: 900px) {
		.code-grid {
			grid-template-columns: 1fr;
		}
	}

	.code-block {
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid #e5e7eb;
	}

	.code-header {
		padding: 0.5rem 0.75rem;
		background: #f9fafb;
		border-bottom: 1px solid #e5e7eb;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.react-badge {
		background: #61dafb20;
		color: #0ea5e9;
	}

	.svelte-badge {
		background: #ff3e0020;
		color: #ff3e00;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		background: #1f2937;
		font-size: 0.85rem;
		line-height: 1.5;
	}

	code {
		font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
		color: #e5e7eb;
		white-space: pre;
	}
</style>
