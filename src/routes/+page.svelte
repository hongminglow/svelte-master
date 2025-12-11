<!--
  Login Page - Demonstrating SvelteKit Form Handling

  This showcases:
  - Superforms integration with Zod validation
  - Progressive enhancement (works without JS!)
  - Two-way binding with bind:value
  - Reactive form state with $ prefix
  - Error display with {#if} blocks

  Compare to React's react-hook-form approach in README.md
-->
<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas/login';
	import { authStore } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';
	import type { LoginFormData } from '$lib/schemas/login';

	// In React: const { data } = useLoaderData() or passed as props
	// In Svelte 5: use exported prop (avoids captured initial value warning)
	export let data: PageData;

	// Initialize superForm with server data
	// This is similar to react-hook-form's useForm()
	const { form, errors, enhance, submitting } = superForm<LoginFormData>(data.form as any, {
		// Client-side validation using the same Zod schema
		// @ts-expect-error superforms types target zod v4; v3 works at runtime
		validators: zodClient(loginSchema),

		// Called after successful server response
		onUpdated: ({ form }) => {
			if (form.valid) {
				// Update global auth store
				authStore.login({
					id: '1',
					email: form.data.email,
					name: 'Demo User'
				});
			}
		},

		// Show validation errors as user types
		validationMethod: 'oninput',
		// Debounce validation to avoid too many checks
		delayMs: 300
	});
</script>

<svelte:head>
	<title>Login - React to Svelte Learning Platform</title>
</svelte:head>

<div class="login-container">
	<div class="login-card">
		<div class="logo">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
		</div>

		<h1>React → Svelte</h1>
		<p class="subtitle">Learn Svelte syntax through React comparisons</p>

		<!-- Server error message -->
		{#if data.error}
			<div class="error-banner" role="alert">
				{data.error}
			</div>
		{/if}

		<!--
      Form with Superforms

      Key differences from React:
      - method="POST" enables progressive enhancement
      - use:enhance provides JS enhancement when available
      - No onSubmit handler needed - form submits natively
      - bind:value for two-way data binding
    -->
		<form method="POST" use:enhance>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={$form.email}
					placeholder="demo@example.com"
					class:error={$errors.email}
					aria-invalid={$errors.email ? 'true' : undefined}
					aria-describedby={$errors.email ? 'email-error' : undefined}
				/>
				{#if $errors.email}
					<span id="email-error" class="error-message">{$errors.email}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					bind:value={$form.password}
					placeholder="password123"
					class:error={$errors.password}
					aria-invalid={$errors.password ? 'true' : undefined}
					aria-describedby={$errors.password ? 'password-error' : undefined}
				/>
				{#if $errors.password}
					<span id="password-error" class="error-message">{$errors.password}</span>
				{/if}
			</div>

			<div class="form-group checkbox-group">
				<label class="checkbox-label">
					<input type="checkbox" name="rememberMe" bind:checked={$form.rememberMe} />
					<span>Remember me</span>
				</label>
			</div>

			<!--
        Button with loading state
        $submitting is a store from superForm - use $ to access value
      -->
			<button type="submit" disabled={$submitting} class:loading={$submitting}>
				{#if $submitting}
					<span class="spinner"></span>
					Signing in...
				{:else}
					Sign In
				{/if}
			</button>
		</form>

		<div class="demo-hint">
			<p>
				<strong>Demo credentials:</strong><br />
				Email: demo@example.com<br />
				Password: password123
			</p>
		</div>

		<div class="features">
			<h3>What you'll learn:</h3>
			<ul>
				<li>🎯 State management ($state vs useState)</li>
				<li>⚡ Effects ($effect vs useEffect)</li>
				<li>🧮 Computed values ($derived vs useMemo)</li>
				<li>📦 Props ($props vs props)</li>
				<li>🧩 Component patterns</li>
				<li>🔄 Data fetching (SvelteKit + TanStack Query)</li>
				<li>🛣️ Routing (File-based vs React Router)</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.login-card {
		width: 100%;
		max-width: 420px;
		padding: 2.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.25),
			0 0 0 1px rgba(0, 0, 0, 0.05);
	}

	.logo {
		width: 48px;
		height: 48px;
		margin: 0 auto 1rem;
		color: #667eea;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: 1.75rem;
		font-weight: 700;
		text-align: center;
		color: #1f2937;
	}

	.subtitle {
		margin: 0 0 1.5rem;
		text-align: center;
		color: #6b7280;
		font-size: 0.95rem;
	}

	.error-banner {
		margin-bottom: 1rem;
		padding: 0.75rem 1rem;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 0.5rem;
		color: #dc2626;
		font-size: 0.875rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	input[type='email'],
	input[type='password'] {
		padding: 0.75rem 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: all 0.15s ease;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
	}

	input.error {
		border-color: #dc2626;
	}

	input.error:focus {
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
	}

	.error-message {
		color: #dc2626;
		font-size: 0.8rem;
	}

	.checkbox-group {
		flex-direction: row;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.checkbox-label input {
		width: 1rem;
		height: 1rem;
		accent-color: #667eea;
	}

	button[type='submit'] {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	button[type='submit']:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	button[type='submit']:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 1rem;
		height: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.demo-hint {
		margin-top: 1.5rem;
		padding: 1rem;
		background: #f0f9ff;
		border-radius: 0.5rem;
		text-align: center;
	}

	.demo-hint p {
		margin: 0;
		font-size: 0.85rem;
		color: #0369a1;
		line-height: 1.6;
	}

	.features {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e5e7eb;
	}

	.features h3 {
		margin: 0 0 0.75rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: #374151;
	}

	.features ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.features li {
		font-size: 0.8rem;
		color: #6b7280;
	}

	@media (max-width: 480px) {
		.features ul {
			grid-template-columns: 1fr;
		}
	}
</style>
