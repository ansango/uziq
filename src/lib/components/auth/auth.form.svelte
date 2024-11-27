<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		action,
		provider
	}: { children: Snippet; action: 'login' | 'logout'; provider: 'lastfm' | 'discogs' } = $props();
</script>

<form method="POST" action={`/auth?/${provider}-${action}`}>
	<button type="submit" aria-label={action}>
		{@render children()}
	</button>
</form>
