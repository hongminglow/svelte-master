<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { snippetsExamples } from '$lib/code-examples';

	let who = $state('World');
	let times = $state(1);
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			Snippets are reusable chunks of markup you can <em>render</em> with
			<code>{'{@render ...}'}</code>. They’re closer to a “template function” than a component: no
			lifecycle, no instance, and no props API — just markup you can call.
		</p>
	</div>

	{#snippet Greeting(name: string)}
		<p class="greeting">Hello, {name}!</p>
	{/snippet}

	<div class="example">
		<h2>Live Demo: {'{#snippet}'} + {'{@render}'}</h2>
		<div class="demo-box">
			<label class="row">
				<span>Name</span>
				<input bind:value={who} />
			</label>

			<label class="row">
				<span>Times</span>
				<input type="number" min="1" max="5" bind:value={times} />
			</label>

			<div class="out">
				{#each Array.from({ length: times }) as _, i (i)}
					{@render Greeting(who)}
				{/each}
			</div>
		</div>

		<CodeComparison
			title="Snippets vs components"
			reactCode={snippetsExamples.basic.react}
			svelteCode={snippetsExamples.basic.svelte}
		/>

		<div class="callout info">
			<h4>Snippet vs Component</h4>
			<ul>
				<li>
					A <strong>component</strong> is an instance with its own state, lifecycle, and props.
				</li>
				<li>
					A <strong>snippet</strong> is markup you <em>render</em> with <code>{'{@render}'}</code>.
				</li>
				<li>
					Snippets can be passed around (e.g. as <code>children</code>) and rendered by other
					components.
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

	.row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
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

	.out {
		display: grid;
		gap: 0.5rem;
		padding-top: 0.5rem;
	}

	.greeting {
		margin: 0;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		background: #f9fafb;
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
