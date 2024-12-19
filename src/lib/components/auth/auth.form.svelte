<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		action,
		className
	}: { children: Snippet; action: 'login' | 'logout'; className?: string } = $props();
</script>

<form method="POST" action={`/auth?/${action}`}>
	<button type="submit" aria-label={action} class={className}>
		{@render children()}
	</button>
</form>
