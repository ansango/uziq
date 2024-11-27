<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { type LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/layout/header.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<Header discogsUser={data.discogsUser} lastfmSession={data.lastfmSession} />

	{@render children()}

	<SvelteQueryDevtools />
</QueryClientProvider>
