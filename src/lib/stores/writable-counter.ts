import { writable } from 'svelte/store';

export type CounterState = { count: number };

export const writableCounter = writable<CounterState>({ count: 0 });

export function incrementWritable() {
	writableCounter.update((state) => ({ ...state, count: state.count + 1 }));
}

export function decrementWritable() {
	writableCounter.update((state) => ({ ...state, count: state.count - 1 }));
}

export function resetWritable() {
	writableCounter.set({ count: 0 });
}
