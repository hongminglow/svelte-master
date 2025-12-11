<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import { stateExamples } from '$lib/code-examples';

	// Interactive Demo: Counter with $state
	let count = $state(0);

	// Interactive Demo: Object state with $state
	let person = $state({
		name: 'John',
		age: 30
	});

	// Interactive Demo: Array state with $state
	let todos = $state([
		{ id: 1, text: 'Learn React', done: true },
		{ id: 2, text: 'Learn Svelte', done: false },
		{ id: 3, text: 'Build something awesome', done: false }
	]);

	let newTodo = $state('');

	function addTodo() {
		if (newTodo.trim()) {
			todos.push({
				id: Date.now(),
				text: newTodo,
				done: false
			});
			newTodo = '';
		}
	}

	function toggleTodo(id: number) {
		const todo = todos.find((t) => t.id === id);
		if (todo) {
			todo.done = !todo.done;
		}
	}

	function removeTodo(id: number) {
		const index = todos.findIndex((t) => t.id === id);
		if (index !== -1) {
			todos.splice(index, 1);
		}
	}
</script>

<div class="section">
	<div class="intro">
		<p class="lead">
			In React, you use <code>useState</code> to create reactive state. In Svelte 5, you use the
			<code>$state</code> rune. The key difference? Svelte allows direct mutations while React requires
			immutable updates.
		</p>
	</div>

	<!-- Key Concepts -->
	<div class="key-concepts">
		<h2>Key Concepts</h2>
		<div class="concept-grid">
			<div class="concept">
				<h3>🎯 $state</h3>
				<p>Creates reactive state. Unlike React, you can mutate it directly.</p>
			</div>
			<div class="concept">
				<h3>🔄 Deep Reactivity</h3>
				<p>Svelte tracks nested property changes automatically.</p>
			</div>
			<div class="concept">
				<h3>📝 Direct Mutations</h3>
				<p>Use <code>.push()</code>, <code>.splice()</code>, and direct assignments.</p>
			</div>
			<div class="concept">
				<h3>⚡ $state.raw</h3>
				<p>For non-reactive state (like large datasets).</p>
			</div>
		</div>
	</div>

	<!-- Example 1: Basic Counter -->
	<div class="example">
		<h2>Example 1: Basic Counter</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="counter-demo">
				<p class="count-display">{count}</p>
				<div class="button-group">
					<button onclick={() => count--}>-</button>
					<button onclick={() => count++}>+</button>
					<button onclick={() => (count = 0)}>Reset</button>
				</div>
			</div>
		</div>
		<CodeComparison
			title="Counter State"
			reactCode={stateExamples.basicCounter.react}
			svelteCode={stateExamples.basicCounter.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				In React, you <strong>must</strong> use the setter function (<code>setCount</code>). In
				Svelte, you can directly mutate: <code>count++</code>. The compiler handles reactivity for
				you!
			</p>
		</div>
	</div>

	<!-- Example 2: Object State -->
	<div class="example">
		<h2>Example 2: Object State</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="person-demo">
				<input type="text" bind:value={person.name} placeholder="Name" />
				<p>{person.name} is {person.age} years old</p>
				<button onclick={() => person.age++}>🎂 Birthday!</button>
			</div>
		</div>
		<CodeComparison
			title="Object State"
			reactCode={stateExamples.objectState.react}
			svelteCode={stateExamples.objectState.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				React requires spreading objects to create new references. Svelte tracks nested properties,
				so <code>person.age++</code> just works!
			</p>
		</div>
	</div>

	<!-- Example 3: Array State (Todo List) -->
	<div class="example">
		<h2>Example 3: Array State (Todo List)</h2>
		<div class="demo-box">
			<h3>Live Demo</h3>
			<div class="todo-demo">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						addTodo();
					}}
				>
					<input type="text" bind:value={newTodo} placeholder="Add a todo..." />
					<button type="submit">Add</button>
				</form>
				<ul class="todo-list">
					{#each todos as todo (todo.id)}
						<li class:done={todo.done}>
							<label>
								<input
									type="checkbox"
									checked={todo.done}
									onchange={() => toggleTodo(todo.id)}
								/>
								<span>{todo.text}</span>
							</label>
							<button class="delete-btn" onclick={() => removeTodo(todo.id)}>×</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<CodeComparison
			title="Array State (Todo List)"
			reactCode={stateExamples.arrayState.react}
			svelteCode={stateExamples.arrayState.svelte}
		/>
		<div class="callout">
			<h4>💡 Key Difference</h4>
			<p>
				In React, you'd use <code>.map()</code> and <code>.filter()</code> to create new arrays. In
				Svelte, <code>.push()</code>, <code>.splice()</code>, and direct mutations all trigger
				reactivity!
			</p>
		</div>
	</div>

	<!-- Example 4: $state.raw -->
	<div class="example">
		<h2>Example 4: Non-reactive State with $state.raw</h2>
		<CodeComparison
			title="$state.raw for Large Data"
			reactCode={stateExamples.stateRaw.react}
			svelteCode={stateExamples.stateRaw.svelte}
		/>
		<div class="callout info">
			<h4>📝 When to use $state.raw</h4>
			<ul>
				<li>Large datasets where you don't need fine-grained reactivity</li>
				<li>Data from external sources that won't be mutated</li>
				<li>Performance optimization when only reference changes matter</li>
			</ul>
		</div>
	</div>

	<!-- Quick Reference -->
	<div class="quick-reference">
		<h2>Quick Reference</h2>
		<table>
			<thead>
				<tr>
					<th>React</th>
					<th>Svelte 5</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>const [x, setX] = useState(0)</code></td>
					<td><code>let x = $state(0)</code></td>
				</tr>
				<tr>
					<td><code>setX(5)</code></td>
					<td><code>x = 5</code></td>
				</tr>
				<tr>
					<td><code>setX(prev =&gt; prev + 1)</code></td>
					<td><code>x++</code></td>
				</tr>
				<tr>
					<td><code>setObj({'{'} ...obj, key: val {'}'} )</code></td>
					<td><code>obj.key = val</code></td>
				</tr>
				<tr>
					<td><code>setArr([...arr, item])</code></td>
					<td><code>arr.push(item)</code></td>
				</tr>
				<tr>
					<td><code>setArr(arr.filter(...))</code></td>
					<td><code>arr.splice(idx, 1)</code></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.section {
		max-width: 900px;
	}

	.intro {
		margin-bottom: 2rem;
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

	/* Key Concepts */
	.key-concepts {
		margin-bottom: 2rem;
	}

	.key-concepts h2 {
		margin: 0 0 1rem;
		color: #1f2937;
	}

	.concept-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.concept {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.concept h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	.concept p {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.concept code {
		background: #e5e7eb;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}

	/* Examples */
	.example {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.example h2 {
		margin: 0 0 1.5rem;
		color: #1f2937;
		font-size: 1.25rem;
	}

	/* Demo Box */
	.demo-box {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.demo-box h3 {
		margin: 0 0 1rem;
		font-size: 0.9rem;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Counter Demo */
	.counter-demo {
		text-align: center;
	}

	.count-display {
		font-size: 4rem;
		font-weight: 700;
		margin: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.button-group button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 1.25rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.button-group button:first-child {
		background: #fee2e2;
		color: #dc2626;
	}

	.button-group button:nth-child(2) {
		background: #dcfce7;
		color: #16a34a;
	}

	.button-group button:last-child {
		background: #f3f4f6;
		color: #6b7280;
	}

	.button-group button:hover {
		transform: scale(1.05);
	}

	/* Person Demo */
	.person-demo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 300px;
	}

	.person-demo input {
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	.person-demo p {
		margin: 0;
		font-size: 1.1rem;
	}

	.person-demo button {
		padding: 0.75rem 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
	}

	/* Todo Demo */
	.todo-demo form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.todo-demo input[type='text'] {
		flex: 1;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	.todo-demo form button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
	}

	.todo-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.todo-list li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.todo-list li.done span {
		text-decoration: line-through;
		color: #9ca3af;
	}

	.todo-list label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
	}

	.todo-list input[type='checkbox'] {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	.delete-btn {
		padding: 0.25rem 0.5rem;
		background: #fee2e2;
		color: #dc2626;
		border: none;
		border-radius: 0.25rem;
		font-size: 1.25rem;
		cursor: pointer;
	}

	/* Callout */
	.callout {
		background: #fef3c7;
		border-left: 4px solid #f59e0b;
		padding: 1rem 1.5rem;
		border-radius: 0 0.5rem 0.5rem 0;
		margin-top: 1.5rem;
	}

	.callout.info {
		background: #eff6ff;
		border-left-color: #3b82f6;
	}

	.callout h4 {
		margin: 0 0 0.5rem;
		color: #92400e;
		font-size: 1rem;
	}

	.callout.info h4 {
		color: #1e40af;
	}

	.callout p {
		margin: 0;
		color: #78350f;
		line-height: 1.6;
	}

	.callout.info p,
	.callout.info li {
		color: #1e3a8a;
	}

	.callout ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.callout li {
		margin: 0.25rem 0;
		line-height: 1.5;
	}

	.callout code {
		background: rgba(0, 0, 0, 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	/* Quick Reference */
	.quick-reference {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.quick-reference h2 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
	}

	.quick-reference table {
		width: 100%;
		border-collapse: collapse;
	}

	.quick-reference th,
	.quick-reference td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.quick-reference th {
		font-weight: 600;
		color: #6b7280;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.quick-reference th:first-child {
		color: #3b82f6;
	}

	.quick-reference th:last-child {
		color: #ff3e00;
	}

	.quick-reference td code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
	}
</style>
