<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Release } from '../../api/release/[id]/mapper';
	import { fetcher } from '$lib/utils';
	import type { PageData } from './$types';
	import Track from '$lib/components/release/track.svelte';

	let { data }: { data: PageData } = $props();

	const release = createQuery({
		queryKey: ['release', data.id],
		queryFn: () => fetcher<Release>()(`/api/release/${data.id}`),
		staleTime: Infinity
	});
</script>

<div class="max-w-md space-y-8">
	<header class="space-y-8">
		<img
			class="aspect-square rounded-sm object-cover"
			src={$release.data?.cover}
			alt={$release.data?.artist + ' - ' + $release.data?.title}
		/>
		<h1>
			{$release.data?.title}
			<span>
				<time>{$release.data?.year}</time>
			</span>
		</h1>
	</header>

	{#if $release.data?.tracklist}
		<ul>
			{#each $release.data.tracklist as { title, duration }}
				<Track {title} {duration} artist={$release.data.artist} album={$release.data.title} />
			{/each}
		</ul>
	{/if}
</div>
