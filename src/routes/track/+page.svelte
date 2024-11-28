<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { clientApi } from '$lib';
	import Bars from '$lib/components/icons/animated/bars.svelte';
	import { useGetRecentTracks } from '$lib/hooks';

	const {
		getRecentTracks: { queryFn, queryKey }
	} = clientApi();
	const tracks = useGetRecentTracks(1000 * 60 * 5, undefined);
</script>

{#if $tracks.isFetching}
	<p>Loading...</p>
{:else if $tracks.isError}
	<p>Error: {$tracks.error.message}</p>
{:else if !$tracks.data}
	<p>No tracks found</p>
{:else}
	<ul class="space-y-8">
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
	</ul>
{/if}
