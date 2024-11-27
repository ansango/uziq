<script lang="ts">
	import { clientApi } from '$lib';
	import { createQuery, createMutation } from '@tanstack/svelte-query';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { getRelease, postBatchTrackScrobble, getRecentTracks } = clientApi();
	const { queryKey, queryFn } = getRelease;
	const release = createQuery({
		queryKey: queryKey(data.id),
		queryFn: () => queryFn(data.id),
		enabled: !!data.id,
		// replace content with (number) in titles
		select: (data) => ({ ...data, artist: data.artists[0].name.replace(/\(\d+\)/g, '').trim() })
	});

	const addMutation = createMutation({
		mutationFn: (data: any) =>
			postBatchTrackScrobble.queryFn(data.id, {
				tracklist: data.tracklist.map((track) => track.title),
				artist: data.artist,
				album: data.title
			}),
		onSuccess: () => {
			data.queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
		}
	});
</script>

<h1>Release</h1>

<p>id: {data.id}</p>

{#if $release.isFetching}
	<p>Loading...</p>
{:else if $release.isError}
	<p>Error: {$release.error.message}</p>
{:else}
	<button
		onclick={() => $addMutation.mutate($release.data)}
		disabled={$addMutation.status === 'pending'}
	>
		Add Todo
	</button>
	<h2>Artist</h2>
	<p>{$release.data.artist}</p>

	<h2>Title</h2>
	<p>{$release.data.title}</p>

	<h2>Year</h2>
	<p>{$release.data.year}</p>

	<h2>Tracklist</h2>

	<ul>
		{#each $release.data.tracklist as track}
			<li>
				{track.title} - {track.duration}
			</li>
		{/each}
	</ul>
{/if}
