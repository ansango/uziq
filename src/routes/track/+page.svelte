<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { clientApi } from '$lib';

	const {
		getRecentTracks: { queryFn, queryKey }
	} = clientApi();
	const tracks = createQuery({
		queryKey,
		queryFn,
		staleTime: 1000 * 60 * 3
	});
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
					<time class="text-xs text-neutral-600">
						{track['@attr']?.nowplaying
							? 'now'
							: new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: '2-digit'
								}).format(new Date(parseInt(track.date?.uts ?? '0') * 1000))}
					</time>
					<!-- {track['@attr']?.nowplaying} -->
				</p>
			</li>
		{/each}
	</ul>
{/if}
