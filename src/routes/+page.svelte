<script lang="ts">
	import Bars from '$lib/components/icons/animated/bars.svelte';
	import TrackLoader from '$lib/components/loaders/track.svelte';
	import { useGetRecentTracks } from '$lib/hooks/use-recent-tracks';
	const tracks = useGetRecentTracks(1000 * 60 * 3, 5);
</script>

<section>
	<h2 class="text-2xl font-medium italic tracking-widest">Top Artists</h2>
</section>

<section class="space-y-5">
	<h2 class="text-2xl font-medium italic tracking-widest">Recent Tracks</h2>
	<ul class="max-w-sm space-y-8">
		{#if $tracks.isLoading || !$tracks.data}
			{#each Array.from({ length: 5 }) as _}
				<TrackLoader />
			{/each}
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
