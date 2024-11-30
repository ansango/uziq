<script lang="ts">
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import type { MappedRelease } from '../../api/release/[id]/mapper';
	import { fetcher } from '$lib/utils';
	import type { PageData } from './$types';
	import Track from '$lib/components/release/track.svelte';
	import type { MappedArtist } from '../../api/artist/mapper';
	import type { MappedAlbum } from '../../api/album/mapper';
	import { addToast } from '$lib/stores';
	import ListPlus from '$lib/components/icons/lucide/list-plus.svelte';

	let { data }: { data: PageData } = $props();

	const release = createQuery({
		queryKey: ['release', data.id],
		queryFn: () => fetcher<MappedRelease>()(`/api/release/${data.id}`)
	});

	const artist = createQuery({
		queryKey: ['artist', $release.data?.artist],
		queryFn: () =>
			fetcher<MappedArtist>()(`/api/artist`, {
				method: 'POST',
				body: JSON.stringify({ artist: $release.data?.artist })
			})
	});

	const album = createQuery({
		queryKey: ['album', $release.data?.title],
		queryFn: () =>
			fetcher<MappedAlbum>()(`/api/album`, {
				method: 'POST',
				body: JSON.stringify({ artist: $release.data?.artist, album: $release.data?.title })
			})
	});
	const queryClient = useQueryClient();
	const batchAlbum = createMutation({
		mutationKey: ['album', data.id],
		mutationFn: (data: {
			id: string;
			artist: string;
			album: string;
			tracklist: { name: string }[];
		}) =>
			fetcher<boolean>()(`/api/release/${data.id}`, {
				method: 'POST',
				body: JSON.stringify(data)
			}),
		onSuccess: () => {
			addToast({
				message: 'Album scrobbled!',
				type: 'success',
				dismissible: true,
				timeout: 3000
			});
			queryClient.invalidateQueries({
				queryKey: ['recent-tracks']
			});
			queryClient.refetchQueries({
				queryKey: ['track', $release.data?.artist]
			});
			queryClient.invalidateQueries({
				queryKey: ['album', $release.data?.title]
			});
		},
		onError: () => {
			addToast({
				message: 'Failed to scrobble album',
				type: 'error',
				dismissible: true,
				timeout: 3000
			});
		}
	});
</script>

<article class="max-w-md space-y-8">
	<header class="space-y-8">
		<img
			class="aspect-square rounded-sm object-cover"
			src={$release.data?.cover}
			alt={$release.data?.artist + ' - ' + $release.data?.title}
		/>
		<section>
			<h1>
				{$release.data?.title}
				<span>
					<time>{$release.data?.year}</time>
					<span>{$release.data?.country}</span>
				</span>
			</h1>
			<section>
				<h2>{$release.data?.artist}</h2>
				<a class="block" href={$release.data?.url} target="_blank" rel="noopener noreferrer"
					>View on Discogs</a
				>
				<a class="block" href={$artist.data?.url} target="_blank" rel="noopener noreferrer"
					>View artist on Lastfm</a
				>
				<p class="line-clamp-1 space-x-2 lowercase">
					{#each $artist.data?.tags || [] as tag}
						<span>#{tag}</span>
					{/each}
				</p>
				<p class="space-x-2">
					{#each $artist.data?.similar || [] as similar}
						<span>{similar}</span>
					{/each}
				</p>
			</section>
		</section>
	</header>

	<section>
		{#if $release.data}
			<button
				type="button"
				onclick={() =>
					$batchAlbum.mutate({
						id: data.id,
						artist: $release.data.artist,
						album: $release.data.title,
						tracklist: $release.data.tracklist.map((track) => ({ name: track.title }))
					})}
			>
				<ListPlus className="size-6" />
			</button>
		{/if}
	</section>

	<section>
		<p>
			global plays - {$album.data?.plays}
		</p>
		<p>{data.lastfmUser} plays - {$album.data?.userplays}</p>
	</section>
	<section>
		{#if $release.data?.tracklist}
			<ul>
				{#each $release.data.tracklist as { title, duration }}
					<Track {title} {duration} artist={$release.data.artist} album={$release.data.title} />
				{/each}
			</ul>
		{/if}
	</section>
</article>
