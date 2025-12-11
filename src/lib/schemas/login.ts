/**
 * Login Schema - Zod validation schema
 *
 * Same Zod schema works in both React and Svelte!
 * Zod is framework-agnostic, making it easy to share validation logic.
 *
 * In React, you'd use this with react-hook-form + @hookform/resolvers/zod
 * In SvelteKit, you use this with sveltekit-superforms
 */

import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters'),
	rememberMe: z.boolean().default(false)
});

// TypeScript type inferred from schema
export type LoginFormData = z.infer<typeof loginSchema>;

/*
 * USAGE COMPARISON:
 *
 * React (with react-hook-form):
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { loginSchema, LoginFormData } from './schema';
 *
 * function LoginForm() {
 *   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
 *     resolver: zodResolver(loginSchema),
 *   });
 *
 *   const onSubmit = (data: LoginFormData) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register('email')} />
 *       {errors.email && <span>{errors.email.message}</span>}
 *       <button type="submit">Login</button>
 *     </form>
 *   );
 * }
 * ```
 *
 * SvelteKit (with Superforms):
 * ```svelte
 * <script lang="ts">
 *   import { superForm } from 'sveltekit-superforms';
 *   import { zodClient } from 'sveltekit-superforms/adapters';
 *   import { loginSchema } from '$lib/schemas/login';
 *
 *   let { data } = $props();
 *   const { form, errors, enhance } = superForm(data.form, {
 *     validators: zodClient(loginSchema)
 *   });
 * </script>
 *
 * <form method="POST" use:enhance>
 *   <input name="email" bind:value={$form.email} />
 *   {#if $errors.email}<span>{$errors.email}</span>{/if}
 *   <button>Login</button>
 * </form>
 * ```
 *
 * Key differences:
 * - Superforms uses native <form> with method="POST"
 * - use:enhance provides progressive enhancement
 * - Form works even without JavaScript (server-side validation)
 * - bind:value for two-way binding
 */
