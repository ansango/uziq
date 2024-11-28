<script lang="ts">
	import type { Snippet } from 'svelte';

	let { className = 'size-5', children }: { className?: string; children: Snippet } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" class={className} viewBox="0 0 24 24">
	{@render children()}
</svg>
