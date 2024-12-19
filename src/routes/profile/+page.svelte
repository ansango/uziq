<script lang="ts">
	import Bars from '$lib/components/icons/animated/bars.svelte';
	import TrackLoader from '$lib/components/loaders/track.svelte';
	import { useGetRecentTracks, userQueryClient } from '$lib/query-client';

	import { createQuery } from '@tanstack/svelte-query';

	const { getTopAlbums } = userQueryClient();

	const albums = createQuery({ ...getTopAlbums, select: (data) => data.slice(0, 12) });

	const recentTracks = useGetRecentTracks({
		limit: 6,
		refetchInterval: 1000 * 60 * 3,
		refetchIntervalInBackground: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		staleTime: 1000 * 60 * 3
	});
</script>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Recent Tracks</h2>
	<ul class="grid grid-cols-12 gap-10">
		{#if $recentTracks.isLoading || !$recentTracks.data}
			{#each Array.from({ length: 5 }) as _}
				<TrackLoader />
			{/each}
		{:else if $recentTracks.isError}
			<p>Error: {$recentTracks.error.message}</p>
		{:else if $recentTracks.data}
			{#each $recentTracks.data as track}
				<li class="col-span-12 md:col-span-6">
					<h3 class="text-xl text-neutral-800">{track.name}</h3>
					<p>
						<span class="font-medium italic text-neutral-800">
							{track.artist['#text']}
						</span>
						<time class="inline-flex items-center text-xs text-neutral-600">
							{#if track['@attr']?.nowplaying}
								<Bars className="ml-0.5 size-3.5" />
							{:else}
								{new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: '2-digit'
								}).format(new Date(parseInt(track.date?.uts ?? '0') * 1000))}
							{/if}
						</time>
					</p>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Your Top Albums</h2>

	<ul class="grid grid-cols-12 gap-5">
		{#if $albums.isLoading}
			{#each Array.from({ length: 50 }) as _}
				<li class="col-span-12 flex items-center space-x-4 sm:col-span-6">
					<div class="flex-1 space-y-1">
						<div class="h-4 w-3/4 rounded bg-neutral-200"></div>
						<div class="h-4 w-1/2 rounded bg-neutral-200"></div>
					</div>
				</li>
			{/each}
		{:else if $albums.isError}
			<p>Error: {$albums.error.message}</p>
		{:else if $albums.data}
			{#each $albums.data as album}
				<li class="col-span-12 flex items-center space-x-4 sm:col-span-6">
					<img alt={album.name} class="h-16 w-16 rounded" src={album.image[2]['#text']} />
					<div class="flex-1 space-y-1">
						<h3 class="line-clamp-1 text-xl text-neutral-800">{album.name}</h3>
						<p class="text-sm text-neutral-600">{album.playcount} plays</p>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</section>
