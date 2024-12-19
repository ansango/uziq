<script lang="ts">
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { type LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/layout/header.svelte';
	import Toasts from '$lib/components/layout/toast/toasts.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let session = $state(Boolean(data.lastfmSession && data.discogsToken));
	let loginPage = $page.url.pathname === '/login';

	$effect(() => {
		if (!session && !loginPage) {
			goto('/login');
		}
	});
</script>

<QueryClientProvider client={data.queryClient}>
	<Toasts />
	<div class="flex h-svh flex-col">
		<Header />
		<main class="max-w-[1920px] flex-1 space-y-10 p-5 md:p-10">
			{@render children()}
		</main>
	</div>
	<SvelteQueryDevtools />
</QueryClientProvider>
