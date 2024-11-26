<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { clientApi } from '$lib';
	const {
		getTracks: { queryFn, queryKey }
	} = clientApi();
	const tracks = createQuery({
		queryKey,
		queryFn
	});
</script>

{#if $tracks.isFetching}
	<p>Loading...</p>
{:else if $tracks.isError}
	<p>Error: {$tracks.error.message}</p>
{:else}
	<h1>Tracks</h1>
	<ul>
		{#if !$tracks.data}
			<p>No tracks found</p>
		{:else}
			{#each $tracks.data as track}
				<li>
					<a
						href={`https://www.last.fm/music/${track.artist['#text']}/${track.album['#text']}/${track.name}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{track.name} - {track.artist['#text']} - {track.album['#text']}
					</a>
				</li>
			{/each}
		{/if}
	</ul>
{/if}
