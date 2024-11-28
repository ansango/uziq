<script lang="ts">
	import { clientApi } from '$lib';
	import Bars from '$lib/components/icons/animated/bars.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const {
		getRecentTracks: { queryFn, queryKey }
	} = clientApi();

	const time = 1000 * 60 * 3;
	const tracks = createQuery({
		queryKey,
		queryFn,
		select: (data) => data?.slice(0, 5),
		staleTime: time,
		refetchIntervalInBackground: true,
		refetchInterval: time
	});
</script>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Recent Tracks</h2>

	<ul class="space-y-8">
		{#if $tracks.isLoading}
			<p>Loading...</p>
		{:else if $tracks.isError}
			<p>Error: {$tracks.error.message}</p>
		{:else if $tracks.data}
			{#each $tracks.data as track}
				<li>
					<h3 class="text-xl text-neutral-800">{track.name}</h3>
					<p>
						<span class="font-medium italic text-neutral-800">
							{track.artist['#text']}
						</span>
						<!-- {track.album['#text']} -->
						<time class="inline-flex items-center text-xs text-neutral-600">
							{#if track['@attr']?.nowplaying}
								<Bars />
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
