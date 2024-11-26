<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { type LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<header>
		<nav>
			<a href="/">Home</a>

			<a href="/profile">Profile</a>
			<a href="/track">Tracks</a>
		</nav>
		{#if data.session}
			<form method="POST" action="/auth?/logout">
				<button type="submit">Logout</button>
			</form>
		{:else}
			<form method="POST" action="/auth?/login">
				<button type="submit">Login</button>
			</form>
		{/if}
	</header>

	{@render children()}

	<SvelteQueryDevtools />
</QueryClientProvider>
