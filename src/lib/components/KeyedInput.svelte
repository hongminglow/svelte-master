<script lang="ts">
	let value = $state('');
	let { label = 'Type something (internal state)' } = $props<{ label?: string }>();
</script>

<div class="keyed-input">
	<label>
		<span class="label">{label}</span>
		<input bind:value placeholder="This resets when remounted" />
	</label>
	<p class="value"><strong>Current:</strong> {value || '—'}</p>
</div>

<style>
	.keyed-input {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.85rem;
		color: #6b7280;
	}

	input {
		padding: 0.6rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
	}

	.value {
		margin: 0.75rem 0 0;
		color: #374151;
	}
</style>
