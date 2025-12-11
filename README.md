# React to Svelte 5 Learning Platform

A comprehensive learning platform for React developers to understand and transition to Svelte 5 and SvelteKit. This application demonstrates the syntax differences between React and Svelte through interactive examples and side-by-side comparisons.

## 🎯 Purpose

This project serves as a practical guide for React developers who want to learn Svelte. Each section of the dashboard showcases equivalent patterns in both frameworks, making the learning curve smoother.

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── stores/           # Global state management (Svelte's alternative to Zustand/Redux)
│   │   └── auth.svelte.ts
│   ├── components/       # Reusable UI components
│   │   └── CodeComparison.svelte
│   └── schemas/          # Zod validation schemas
│       └── login.ts
├── routes/
│   ├── +layout.svelte    # Root layout
│   ├── +page.svelte      # Home/Login page
│   └── dashboard/        # Protected dashboard routes
│       ├── +layout.svelte
│       ├── +page.svelte
│       ├── state/
│       ├── effects/
│       ├── memo/
│       ├── props/
│       ├── components/
│       ├── data-fetching/
│       └── routing/
```

---

## 🔄 React vs Svelte 5 Syntax Comparison

### 1. State Management

#### React (useState)

```jsx
import { useState } from 'react';

function Counter() {
	const [count, setCount] = useState(0);

	return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

#### Svelte 5 ($state rune)

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>
	Count: {count}
</button>
```

**Key Differences:**

- Svelte uses `$state` rune instead of `useState` hook
- No need for setter functions - direct mutation works
- Event handlers use lowercase `onclick` (native DOM events)
- No import needed - runes are built into the language

---

### 2. Side Effects

#### React (useEffect)

```jsx
import { useState, useEffect } from 'react';

function Timer() {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((s) => s + 1);
		}, 1000);

		return () => clearInterval(interval); // Cleanup
	}, []); // Dependency array

	return <div>Seconds: {seconds}</div>;
}
```

#### Svelte 5 ($effect rune)

```svelte
<script>
	let seconds = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			seconds++;
		}, 1000);

		return () => clearInterval(interval); // Cleanup
	});
	// No dependency array needed - Svelte auto-tracks!
</script>

<div>Seconds: {seconds}</div>
```

**Key Differences:**

- Svelte automatically tracks dependencies - no dependency array
- Same cleanup function pattern (return a function)
- `$effect` runs after DOM updates (like `useEffect`)
- Use `$effect.pre` for effects that run before DOM updates

---

### 3. Computed/Derived Values

#### React (useMemo)

```jsx
import { useState, useMemo } from 'react';

function ExpensiveCalculation() {
	const [items, setItems] = useState([1, 2, 3, 4, 5]);
	const [multiplier, setMultiplier] = useState(2);

	const total = useMemo(() => {
		return items.reduce((sum, item) => sum + item * multiplier, 0);
	}, [items, multiplier]); // Must specify dependencies

	return <div>Total: {total}</div>;
}
```

#### Svelte 5 ($derived rune)

```svelte
<script>
	let items = $state([1, 2, 3, 4, 5]);
	let multiplier = $state(2);

	// Simple expression
	let total = $derived(items.reduce((sum, item) => sum + item * multiplier, 0));

	// Complex logic with $derived.by
	let analysis = $derived.by(() => {
		const sum = items.reduce((a, b) => a + b, 0);
		const avg = sum / items.length;
		return { sum, avg, multiplied: sum * multiplier };
	});
</script>

<div>Total: {total}</div><div>Average: {analysis.avg}</div>
```

**Key Differences:**

- `$derived` auto-tracks dependencies like `$effect`
- Use `$derived.by(() => ...)` for complex multi-line computations
- No dependency array needed
- Values are truly reactive - recalculated only when dependencies change

---

### 4. Props

#### React

```jsx
// Child component
function Greeting({ name, age = 18, onGreet }) {
	return (
		<div>
			<h1>
				Hello, {name}! You are {age}.
			</h1>
			<button onClick={onGreet}>Greet</button>
		</div>
	);
}

// Parent component
function App() {
	return <Greeting name="Alice" age={25} onGreet={() => alert('Hi!')} />;
}
```

#### Svelte 5 ($props rune)

```svelte
<!-- Child: Greeting.svelte -->
<script>
  let { name, age = 18, onGreet } = $props();
</script>

<div>
  <h1>Hello, {name}! You are {age}.</h1>
  <button onclick={onGreet}>Greet</button>
</div>

<!-- Parent: App.svelte -->
<script>
  import Greeting from './Greeting.svelte';
</script>

<Greeting name="Alice" age={25} onGreet={() => alert('Hi!')} />
```

**Key Differences:**

- Svelte uses destructuring with `$props()` rune
- Default values work with standard JS destructuring syntax
- TypeScript support: `let { name }: { name: string } = $props()`
- Rest props: `let { name, ...rest } = $props()`

---

### 5. Component Structure

#### React

```jsx
import { useState } from 'react';
import './Card.css';

export default function Card({ title, children }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={`card ${expanded ? 'expanded' : ''}`}>
			<h2 onClick={() => setExpanded(!expanded)}>{title}</h2>
			{expanded && <div className="content">{children}</div>}
		</div>
	);
}
```

#### Svelte 5

```svelte
<!-- Card.svelte -->
<script>
	let { title, children } = $props();
	let expanded = $state(false);
</script>

<div class="card" class:expanded>
	<h2 onclick={() => (expanded = !expanded)}>{title}</h2>
	{#if expanded}
		<div class="content">{@render children()}</div>
	{/if}
</div>

<style>
	.card {
		border: 1px solid #ccc;
		padding: 1rem;
	}
	.expanded {
		background: #f0f0f0;
	}
</style>
```

**Key Differences:**

- Single-file components with `<script>`, markup, and `<style>` sections
- Scoped CSS by default (no CSS modules needed!)
- `class:name` directive for conditional classes
- `{#if}...{/if}` block syntax for conditionals
- `{@render children()}` instead of `{children}`
- No need for `className` - use native `class`

---

### 6. Conditional Rendering

#### React

```jsx
function Status({ isLoggedIn, isAdmin, items }) {
	return (
		<div>
			{isLoggedIn ? <Dashboard /> : <Login />}

			{isAdmin && <AdminPanel />}

			{items.length > 0 ? (
				<ul>
					{items.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			) : (
				<p>No items found</p>
			)}
		</div>
	);
}
```

#### Svelte 5

```svelte
<script>
	let { isLoggedIn, isAdmin, items } = $props();
</script>

<div>
	{#if isLoggedIn}
		<Dashboard />
	{:else}
		<Login />
	{/if}

	{#if isAdmin}
		<AdminPanel />
	{/if}

	{#if items.length > 0}
		<ul>
			{#each items as item (item.id)}
				<li>{item.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No items found</p>
	{/if}
</div>
```

**Key Differences:**

- Block syntax: `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- `{#each}` for loops with built-in key syntax `(item.id)`
- More readable template logic
- `{:else}` works with `{#each}` for empty states

---

### 7. Global State Management

#### React (with Zustand)

```jsx
// store.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}));

// Component.jsx
import { useAuthStore } from './store';

function Profile() {
	const { user, logout } = useAuthStore();
	return (
		<div>
			<p>Welcome, {user.name}</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
```

#### Svelte 5 (Native - No Library Needed!)

```typescript
// lib/stores/auth.svelte.ts
class AuthStore {
  user = $state<User | null>(null);
  isAuthenticated = $derived(this.user !== null);

  login(user: User) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }
}

export const authStore = new AuthStore();

// Component.svelte
<script>
  import { authStore } from '$lib/stores/auth.svelte';
</script>

<div>
  <p>Welcome, {authStore.user.name}</p>
  <button onclick={() => authStore.logout()}>Logout</button>
</div>
```

**Key Differences:**

- No external library needed - Svelte's reactivity works everywhere!
- Use `.svelte.ts` files to use runes outside components
- Class-based stores with `$state` and `$derived` are powerful
- Direct property access - no selectors or hooks needed

---

### 8. Forms & Validation

#### React (with react-hook-form + zod)

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	});

	const onSubmit = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('email')} />
			{errors.email && <span>{errors.email.message}</span>}

			<input type="password" {...register('password')} />
			{errors.password && <span>{errors.password.message}</span>}

			<button type="submit">Login</button>
		</form>
	);
}
```

#### SvelteKit (with Superforms + zod)

```typescript
// +page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const load = async () => {
  const form = await superValidate(zod(schema));
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    // Handle login
    return { form };
  }
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const { form, errors, enhance } = superForm(data.form, {
		validators: zodClient(schema)
	});
</script>

<form method="POST" use:enhance>
	<input name="email" bind:value={$form.email} />
	{#if $errors.email}<span>{$errors.email}</span>{/if}

	<input type="password" name="password" bind:value={$form.password} />
	{#if $errors.password}<span>{$errors.password}</span>{/if}

	<button>Login</button>
</form>
```

**Key Differences:**

- SvelteKit has built-in form actions (server-side handling)
- Superforms provides progressive enhancement with `use:enhance`
- Works without JavaScript (progressive enhancement)
- `bind:value` for two-way binding

---

### 9. Data Fetching

#### React (with TanStack Query)

```jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['users'],
		queryFn: () => fetch('/api/users').then((r) => r.json())
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<ul>
			{data.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
```

#### Svelte (with TanStack Query)

```svelte
<script>
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['users'],
		queryFn: () => fetch('/api/users').then((r) => r.json())
	});
</script>

{#if $query.isLoading}
	<div>Loading...</div>
{:else if $query.error}
	<div>Error: {$query.error.message}</div>
{:else}
	<ul>
		{#each $query.data as user (user.id)}
			<li>{user.name}</li>
		{/each}
	</ul>
{/if}
```

#### SvelteKit Native (Load Functions)

```typescript
// +page.server.ts
export async function load({ fetch }) {
  const users = await fetch('/api/users').then(r => r.json());
  return { users };
}
```

```svelte
<!-- +page.svelte -->
<script>
	let { data } = $props();
</script>

<ul>
	{#each data.users as user (user.id)}
		<li>{user.name}</li>
	{/each}
</ul>
```

**Key Differences:**

- TanStack Query works similarly in both frameworks
- SvelteKit has built-in `load` functions for server-side data fetching
- Svelte Query uses store syntax with `$` prefix
- SvelteKit approach is simpler for SSR scenarios

---

### 10. Routing

#### React (with React Router)

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/users/123">User 123</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/users/:id" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

function User() {
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div>
			<h1>User {id}</h1>
			<button onClick={() => navigate('/')}>Go Home</button>
		</div>
	);
}
```

#### SvelteKit (File-based Routing - Built-in!)

```
src/routes/
├── +page.svelte          # /
├── about/
│   └── +page.svelte      # /about
└── users/
    └── [id]/
        └── +page.svelte  # /users/:id
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/users/123">User 123</a>
</nav>

{@render children()}

<!-- src/routes/users/[id]/+page.svelte -->
<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
</script>

<h1>User {page.params.id}</h1>
<button onclick={() => goto('/')}>Go Home</button>
```

**Key Differences:**

- SvelteKit uses file-based routing - no router configuration!
- `[param]` folders for dynamic routes
- Native `<a>` tags instead of `<Link>` components
- `$app/navigation` for programmatic navigation
- `$app/state` for accessing route params and URL

---

## 🛠 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack framework for Svelte
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Forms**: [Superforms](https://superforms.rocks/) - Form handling for SvelteKit
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Async state management
- **State**: Native Svelte 5 runes - No external library needed!

## 📚 Learning Resources

- [Official Svelte Tutorial](https://svelte.dev/tutorial)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Superforms Documentation](https://superforms.rocks/)

## 🎓 Features Demonstrated

1. **Authentication Flow** - Login page with form validation
2. **Global State** - User authentication state using Svelte's native reactivity
3. **Form Handling** - Superforms with Zod validation (progressive enhancement)
4. **Data Fetching** - TanStack Query integration with public APIs
5. **Routing** - SvelteKit's file-based routing system
6. **All Runes** - `$state`, `$derived`, `$effect`, `$props`, `$bindable`

## License

MIT
