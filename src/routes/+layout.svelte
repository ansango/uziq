<script lang="ts">
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { type LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/layout/header.svelte';
	import Toasts from '$lib/components/layout/toast/toasts.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<Toasts />
	<Header discogsUser={data.discogsUser} lastfmSession={data.lastfmSession} />
	<main class="max-w-[1920px] space-y-10 p-5 md:p-10">
		{@render children()}
	</main>
	<SvelteQueryDevtools />
</QueryClientProvider>
