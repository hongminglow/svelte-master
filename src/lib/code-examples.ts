// Code examples for the learning sections
// Using separate file to avoid template literal issues with </script> tags

export const dashboardOverviewExamples = {
	react: `// React Component
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
	svelte:
		`<!-- Svelte Component -->
<` +
		`script>
  let count = $state(0);
  
  $effect(() => {
    document.title = \`Count: \${count}\`;
  });
</` +
		`script>

<button onclick={() => count++}>
  Count: {count}
</button>`
};

export const effectsExamples = {
	basicEffect: {
		react: `import { useState, useEffect } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);
  
  // useEffect runs after render
  // Dependency array controls when it runs
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // Only re-run when count changes
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
		svelte:
			`<` +
			`script>
  let count = $state(0);
  
  // $effect automatically tracks dependencies
  // No dependency array needed!
  $effect(() => {
    document.title = \`Count: \${count}\`;
  });
</` +
			`script>

<button onclick={() => count++}>
  Count: {count}
</button>`
	},
	cleanup: {
		react: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Setup
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function runs before effect re-runs
    // and on unmount
    return () => clearInterval(interval);
  }, []); // Empty array = run once
  
  return <p>Seconds: {seconds}</p>;
}`,
		svelte:
			`<` +
			`script>
  let seconds = $state(0);
  
  $effect(() => {
    // Setup
    const interval = setInterval(() => {
      seconds++;
    }, 1000);
    
    // Return cleanup function
    // Same pattern as React!
    return () => clearInterval(interval);
  });
</` +
			`script>

<p>Seconds: {seconds}</p>`
	},
	effectPre: {
		react: `import { useLayoutEffect, useRef } from 'react';

function AutoScroll() {
  const ref = useRef(null);
  
  // useLayoutEffect runs synchronously
  // before browser paint
  useLayoutEffect(() => {
    ref.current?.scrollTo(0, 0);
  });
  
  return <div ref={ref}>...</div>;
}`,
		svelte:
			`<` +
			`script>
  let container;
  
  // $effect.pre runs before DOM updates
  // Equivalent to useLayoutEffect
  $effect.pre(() => {
    container?.scrollTo(0, 0);
  });
</` +
			`script>

<div bind:this={container}>...</div>`
	}
};

export const memoExamples = {
	useMemo: {
		react: `import { useState, useMemo } from 'react';

function ExpensiveList({ items, filter }) {
  // useMemo caches computed value
  // Recalculates when dependencies change
  const filtered = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => 
      item.name.includes(filter)
    );
  }, [items, filter]);
  
  return (
    <ul>
      {filtered.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
		svelte:
			`<` +
			`script>
  let { items, filter } = $props();
  
  // $derived automatically tracks dependencies
  // Much cleaner - no dependency array!
  const filtered = $derived(
    items.filter(item => 
      item.name.includes(filter)
    )
  );
  
  // For complex computations:
  const complex = $derived.by(() => {
    console.log('Computing...');
    return expensiveOperation(items);
  });
</` +
			`script>

<ul>
  {#each filtered as item (item.id)}
    <li>{item.name}</li>
  {/each}
</ul>`
	},
	useCallback: {
		react: `import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  // useCallback caches function reference
  // Prevents unnecessary re-renders of children
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const addAmount = useCallback((amount) => {
    setCount(c => c + amount);
  }, []);
  
  return (
    <Child 
      onIncrement={increment}
      onAdd={addAmount}
    />
  );
}`,
		svelte:
			`<` +
			`script>
  let count = $state(0);
  
  // In Svelte, functions are stable by default
  // No useCallback equivalent needed!
  function increment() {
    count++;
  }
  
  function addAmount(amount) {
    count += amount;
  }
  
  // Svelte's fine-grained reactivity means
  // child components only update when their
  // specific props change
</` +
			`script>

<Child 
  onIncrement={increment}
  onAdd={addAmount}
/>`
	}
};

export const propsExamples = {
	basicProps: {
		react: `// React: Props as function parameter
function Greeting({ name, age, isActive = false }) {
  return (
    <div className={isActive ? 'active' : ''}>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// TypeScript version
interface GreetingProps {
  name: string;
  age: number;
  isActive?: boolean;
}

function Greeting({ name, age, isActive = false }: GreetingProps) {
  return (
    <div className={isActive ? 'active' : ''}>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}`,
		svelte:
			`<` +
			`script lang="ts">
  // Svelte 5: Props with $props rune
  interface Props {
    name: string;
    age: number;
    isActive?: boolean;
  }
  
  // Destructure with defaults
  let { name, age, isActive = false }: Props = $props();
</` +
			`script>

<div class:active={isActive}>
  <h1>Hello, {name}!</h1>
  <p>Age: {age}</p>
</div>`
	},
	childrenProps: {
		react: `// React: children is a special prop
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>Card content here</p>
  <button>Click me</button>
</Card>`,
		svelte:
			`<` +
			`script>
  // children is a snippet in Svelte 5
  let { title, children } = $props();
</` +
			`script>

<div class="card">
  <h2>{title}</h2>
  <div class="content">
    <!-- Render children snippet -->
    {@render children()}
  </div>
</div>

<!-- Usage -->
<Card title="My Card">
  <p>Card content here</p>
  <button>Click me</button>
</Card>`
	},
	bindableProps: {
		react: `// React: Two-way binding requires callbacks
function Input({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Parent must manage state
function Parent() {
  const [text, setText] = useState('');
  return <Input value={text} onChange={setText} />;
}`,
		svelte:
			`<` +
			`script>
  // $bindable allows two-way binding
  let { value = $bindable() } = $props();
</` +
			`script>

<input bind:value />

<!-- Parent can use bind: directive -->
<` +
			`script>
  let text = $state('');
</` +
			`script>

<Input bind:value={text} />

<!-- No onChange callback needed! -->`
	}
};

export const componentExamples = {
	conditionalRendering: {
		react: `function Status({ isLoggedIn, isAdmin }) {
  return (
    <div>
      {/* Ternary for if-else */}
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please log in</p>
      )}
      
      {/* && for conditional render */}
      {isAdmin && <AdminPanel />}
      
      {/* Multiple conditions */}
      {isLoggedIn && isAdmin && (
        <SuperAdminPanel />
      )}
    </div>
  );
}`,
		svelte:
			`<` +
			`script>
  let { isLoggedIn, isAdmin } = $props();
</` +
			`script>

<div>
  <!-- if-else blocks -->
  {#if isLoggedIn}
    <p>Welcome back!</p>
  {:else}
    <p>Please log in</p>
  {/if}
  
  <!-- Simple conditional -->
  {#if isAdmin}
    <AdminPanel />
  {/if}
  
  <!-- else-if chains -->
  {#if isLoggedIn && isAdmin}
    <SuperAdminPanel />
  {:else if isLoggedIn}
    <UserPanel />
  {:else}
    <LoginPrompt />
  {/if}
</div>`
	},
	listRendering: {
		react: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // key is required for reconciliation
        <li key={todo.id}>
          {index + 1}. {todo.text}
          {todo.done && ' ✓'}
        </li>
      ))}
    </ul>
  );
}

// Empty state handling
function List({ items }) {
  if (items.length === 0) {
    return <p>No items</p>;
  }
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
		svelte:
			`<` +
			`script>
  let { todos } = $props();
</` +
			`script>

<ul>
  <!-- each block with key expression -->
  {#each todos as todo, index (todo.id)}
    <li>
      {index + 1}. {todo.text}
      {#if todo.done} ✓{/if}
    </li>
  {/each}
</ul>

<!-- Empty state with :else -->
{#each items as item (item.id)}
  <div>{item.name}</div>
{:else}
  <p>No items</p>
{/each}`
	},
	eventHandling: {
		react: `function Form() {
  const [value, setValue] = useState('');
  
  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', value);
  };
  
  const handleClick = (e) => {
    console.log('Clicked at:', e.clientX);
  };
  
  // Inline handlers
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => console.log('Focused')}
      />
      <button 
        type="submit"
        onClick={handleClick}
      >
        Submit
      </button>
    </form>
  );
}`,
		svelte:
			`<` +
			`script>
  let value = $state('');
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted:', value);
  }
  
  function handleClick(e) {
    console.log('Clicked at:', e.clientX);
  }
</` +
			`script>

<form onsubmit={handleSubmit}>
  <!-- Two-way binding! No onChange needed -->
  <input
    bind:value
    onfocus={() => console.log('Focused')}
  />
  <button 
    type="submit"
    onclick={handleClick}
  >
    Submit
  </button>
</form>

<!-- Event modifiers (no React equivalent) -->
<form onsubmit|preventDefault={handleSubmit}>
  <button onclick|stopPropagation={handleClick}>
    Click
  </button>
</form>`
	}
};

export const dataFetchingExamples = {
	serverLoad: {
		react: `// React: Client-side fetching with useEffect
import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
		svelte:
			`<!-- +page.server.ts (runs on server) -->
export async function load({ fetch }) {
  const res = await fetch('/api/users');
  const users = await res.json();
  
  // Returned data is available in page
  return { users };
}

<!-- +page.svelte -->
<` +
			`script>
  // Data from load function
  let { data } = $props();
</` +
			`script>

<!-- No loading state needed for SSR! -->
<!-- Data is ready when page renders -->
<ul>
  {#each data.users as user (user.id)}
    <li>{user.name}</li>
  {/each}
</ul>`
	},
	tanstackQuery: {
		react: `import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => 
      fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
		svelte:
			`<` +
			`script>
  import { createQuery } from '@tanstack/svelte-query';
  
  // Same API as React Query!
  const query = createQuery({
    queryKey: ['users'],
    queryFn: () => 
      fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000
  });
</` +
			`script>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.error}
  <p>Error!</p>
{:else}
  <ul>
    {#each $query.data as user (user.id)}
      <li>{user.name}</li>
    {/each}
  </ul>
{/if}`
	}
};

export const routingExamples = {
	basicRouting: {
		react: `// React Router setup
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}`,
		svelte:
			`<!-- SvelteKit: File-based routing -->
<!-- No router setup needed! -->

<!-- src/routes/+page.svelte = "/" -->
<!-- src/routes/about/+page.svelte = "/about" -->
<!-- src/routes/users/+page.svelte = "/users" -->
<!-- src/routes/users/[id]/+page.svelte = "/users/:id" -->

<!-- Navigation with regular links -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/users">Users</a>
</nav>

<!-- Active link styling -->
<` +
			`script>
  import { page } from '$app/state';
</` +
			`script>

<a 
  href="/about" 
  class:active={page.url.pathname === '/about'}
>
  About
</a>`
	},
	dynamicRoutes: {
		react: `// React Router: useParams hook
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  
  // Fetch user data with id...
  
  return <h1>User {id}</h1>;
}

// Route definition
<Route path="/users/:id" element={<UserDetail />} />`,
		svelte:
			`<!-- src/routes/users/[id]/+page.svelte -->
<` +
			`script>
  // Params from load function
  let { data } = $props();
</` +
			`script>

<h1>User {data.user.name}</h1>

<!-- +page.server.ts -->
export async function load({ params }) {
  const user = await getUser(params.id);
  return { user };
}

<!-- Or use page store for client-side -->
<` +
			`script>
  import { page } from '$app/state';
  // page.params.id
</` +
			`script>`
	},
	navigation: {
		react: `import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    
    // Programmatic navigation
    navigate('/dashboard');
    
    // With replace (no back history)
    navigate('/dashboard', { replace: true });
    
    // Go back
    navigate(-1);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`,
		svelte:
			`<` +
			`script>
  import { goto } from '$app/navigation';
  
  async function handleSubmit(e) {
    e.preventDefault();
    await login();
    
    // Programmatic navigation
    goto('/dashboard');
    
    // With options
    goto('/dashboard', { replaceState: true });
    
    // Go back
    history.back();
  }
</` +
			`script>

<form onsubmit={handleSubmit}>...</form>

<!-- Or use form actions for server-side -->
<form method="POST" action="?/login">
  <!-- Redirects handled in +page.server.ts -->
</form>`
	}
};

// State management examples
export const stateExamples = {
	basicCounter: {
		react: `import { useState } from 'react';

function Counter() {
  // State declaration with initial value
  const [count, setCount] = useState(0);
  
  // Must use setter function to update
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
		svelte:
			`<` +
			`script>
  // State declaration with $state rune
  let count = $state(0);
  
  // Direct mutations work!
  const increment = () => count++;
  const decrement = () => count--;
  const reset = () => count = 0;
</` +
			`script>

<div>
  <p>Count: {count}</p>
  <button onclick={decrement}>-</button>
  <button onclick={increment}>+</button>
  <button onclick={reset}>Reset</button>
</div>`
	},
	objectState: {
		react: `import { useState } from 'react';

function PersonForm() {
  const [person, setPerson] = useState({
    name: 'John',
    age: 30
  });
  
  // Must spread to create new object reference
  const updateName = (name) => {
    setPerson(prev => ({ ...prev, name }));
  };
  
  const birthday = () => {
    setPerson(prev => ({
      ...prev,
      age: prev.age + 1
    }));
  };
  
  return (
    <div>
      <input
        value={person.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <p>{person.name} is {person.age} years old</p>
      <button onClick={birthday}>🎂 Birthday!</button>
    </div>
  );
}`,
		svelte:
			`<` +
			`script>
  // Reactive object state
  let person = $state({
    name: 'John',
    age: 30
  });
  
  // Direct property mutation works!
  // Svelte tracks nested property changes
  function birthday() {
    person.age++;
  }
</` +
			`script>

<div>
  <!-- Two-way binding with bind:value -->
  <input bind:value={person.name} />
  <p>{person.name} is {person.age} years old</p>
  <button onclick={birthday}>🎂 Birthday!</button>
</div>`
	},
	arrayState: {
		react: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn Svelte', done: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      // Must create new array
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        done: false
      }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    // Map to create new array with updated item
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, done: !todo.done }
        : todo
    ));
  };
  
  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };
  
  return (/* JSX here */);
}`,
		svelte:
			`<` +
			`script>
  let todos = $state([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn Svelte', done: false }
  ]);
  let newTodo = $state('');
  
  function addTodo() {
    if (newTodo.trim()) {
      // Array methods work directly!
      todos.push({
        id: Date.now(),
        text: newTodo,
        done: false
      });
      newTodo = '';
    }
  }
  
  function toggleTodo(id) {
    // Direct property mutation
    const todo = todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }
  
  function removeTodo(id) {
    const idx = todos.findIndex(t => t.id === id);
    if (idx !== -1) todos.splice(idx, 1);
  }
</` +
			`script>`
	},
	stateRaw: {
		react: `// React doesn't have an equivalent
// All React state is deeply reactive by default
// (which means you must always create new references)

// For performance with large objects,
// React devs use libraries like Immer:
// import { useImmer } from 'use-immer';

const [state, updateState] = useImmer(largeObject);
updateState(draft => {
  draft.deeply.nested.value = 'new';
});`,
		svelte:
			`<` +
			`script>
  // $state.raw for non-reactive state
  // Good for large objects you don't need to track
  let largeData = $state.raw({
    // thousands of items...
  });
  
  // To update, must reassign the whole thing
  function updateData(newData) {
    largeData = newData;
  }
  
  // Useful when you only care about
  // reference changes, not mutations
</` +
			`script>`
	}
};
