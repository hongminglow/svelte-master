export const globalCounter = $state({
	count: 0
});

export function increment() {
	globalCounter.count += 1;
}

export function decrement() {
	globalCounter.count -= 1;
}

export function reset() {
	globalCounter.count = 0;
}
