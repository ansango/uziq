<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, action }: { children: Snippet; action: 'login' | 'logout' } = $props();
</script>

<form method="POST" action={`/auth?/${action}`}>
	<button type="submit" aria-label={action}>
		{@render children()}
	</button>
</form>
