<script lang="ts">
	import Bars from '$lib/components/icons/animated/bars.svelte';
	import TrackLoader from '$lib/components/loaders/track.svelte';
	import { useGetRecentTracks, userQueryClient } from '$lib/query-client';

	import { createQuery } from '@tanstack/svelte-query';

	const { getTopArtists, getTopAlbums, getTopTracks } = userQueryClient();
	const artists = createQuery({
		queryKey: getTopArtists.queryKey,
		queryFn: getTopArtists.queryFn
	});

	const albums = createQuery({
		queryKey: getTopAlbums.queryKey,
		queryFn: getTopAlbums.queryFn
	});

	const tracks = createQuery({
		queryKey: getTopTracks.queryKey,
		queryFn: getTopTracks.queryFn
	});

	const recentTracks = useGetRecentTracks({
		limit: 5,
		refetchInterval: 1000 * 60 * 3,
		refetchIntervalInBackground: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		staleTime: 1000 * 60 * 3
	});
</script>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Recent Tracks</h2>
	<ul class="max-w-sm space-y-8">
		{#if $recentTracks.isLoading || !$recentTracks.data}
			{#each Array.from({ length: 5 }) as _}
				<TrackLoader />
			{/each}
		{:else if $recentTracks.isError}
			<p>Error: {$recentTracks.error.message}</p>
		{:else if $recentTracks.data}
			{#each $recentTracks.data as track}
				<li>
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
	<h2 class="text-2xl font-medium italic tracking-widest">Top Artists</h2>
	<ul class="grid grid-cols-12 gap-5">
		{#if $artists.isLoading || !$artists.data}
			{#each Array.from({ length: 50 }) as _}
				<li class="col-span-6 flex items-center space-x-4 md:col-span-4 xl:col-span-3">
					<div class="flex-1 space-y-1">
						<div class="h-4 w-3/4 rounded bg-neutral-200"></div>
						<div class="h-4 w-1/2 rounded bg-neutral-200"></div>
					</div>
				</li>
			{/each}
		{:else if $artists.isError}
			<p>Error: {$artists.error.message}</p>
		{:else if $artists.data}
			{#each $artists.data as artist}
				<li class="col-span-6 flex items-center space-x-4 md:col-span-4 xl:col-span-3">
					<div class="flex-1 space-y-1">
						<h3 class="line-clamp-1 text-xl text-neutral-800">{artist.name}</h3>
						<p class="text-sm text-neutral-600">{artist.playcount} plays</p>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Top Albums</h2>
	<ul class="grid grid-cols-12 gap-5">
		{#if $albums.isLoading || !$albums.data}
			{#each Array.from({ length: 50 }) as _}
				<li class="col-span-12 flex items-center space-x-4 sm:col-span-6 xl:col-span-4">
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
				<li class="col-span-12 flex items-center space-x-4 sm:col-span-6 xl:col-span-4">
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

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Top Tracks</h2>
	<ul class="grid grid-cols-12 gap-5">
		{#if $tracks.isLoading || !$tracks.data}
			{#each Array.from({ length: 50 }) as _}
				<li class="col-span-6 flex items-center space-x-4 md:col-span-4 xl:col-span-3">
					<div class="flex-1 space-y-1">
						<div class="h-4 w-3/4 rounded bg-neutral-200"></div>
						<div class="h-4 w-1/2 rounded bg-neutral-200"></div>
					</div>
				</li>
			{/each}
		{:else if $tracks.isError}
			<p>Error: {$tracks.error.message}</p>
		{:else if $tracks.data}
			{#each $tracks.data as track}
				<li class="col-span-6 flex items-center space-x-4 md:col-span-4 xl:col-span-3">
					<div class="flex-1 space-y-1">
						<h3 class="line-clamp-1 text-xl text-neutral-800">{track.name}</h3>
						<p class="text-sm text-neutral-600">{track.playcount} plays</p>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</section>
