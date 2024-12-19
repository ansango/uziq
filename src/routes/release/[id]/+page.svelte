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
	import Discogs from '$lib/components/icons/brands/discogs.svelte';
	import Lastfm from '$lib/components/icons/brands/lastfm.svelte';
	import { trackQueryClient } from '$lib/query-client';

	let { data }: { data: PageData } = $props();
	const { postBatchTrackScrobble } = trackQueryClient();
	const queryClient = useQueryClient();
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

	const batchAlbum = createMutation({
		...postBatchTrackScrobble(data.id),
		onMutate: async ({ album, tracklist, artist }) => {
			queryClient.cancelQueries({ queryKey: ['album', album] });
			queryClient.cancelQueries({ queryKey: ['track'] });
			const previousAlbum = queryClient.getQueryData<MappedAlbum>(['album', album]);
			const previousTracks = queryClient.getQueriesData({ queryKey: ['track'] });

			console.log(previousTracks);

			if (previousAlbum) {
				queryClient.setQueryData<MappedAlbum>(['album', album], {
					...previousAlbum,
					userplays: previousAlbum?.userplays + 1
				});
			}

			return { previousAlbum, previousTracks };
		},
		onSuccess: () => {
			addToast({
				message: 'Album scrobbled!',
				type: 'success',
				dismissible: true,
				timeout: 3000
			});

			queryClient.invalidateQueries({
				queryKey: ['track']
			});
		},
		onError: (error, variables, context) => {
			if (context?.previousAlbum) {
				queryClient.setQueryData<MappedAlbum>(['album', data.id], context.previousAlbum);
			}
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
	<header class="space-y-3">
		<picture>
			<img
				class="aspect-square rounded-sm object-cover"
				src={$release.data?.cover}
				alt={$release.data?.artist + ' - ' + $release.data?.title}
			/>
			<p class="mt-0.5 text-sm italic text-neutral-500">
				"<author>{$release.data?.artist}</author> - {$release.data?.title}" from {$release.data
					?.country} realased in
				<time>{$release.data?.year}</time>
			</p>
		</picture>

		<section>
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-medium">
					{$release.data?.title}
				</h1>
				<div class="-mt-0.5 flex items-center gap-2">
					<a
						class="text-neutral-700"
						href={$release.data?.url}
						target="_blank"
						rel="noopener noreferrer"><Discogs className="size-6" /></a
					>
					<a
						class="text-neutral-700"
						href={$artist.data?.url}
						target="_blank"
						rel="noopener noreferrer"><Lastfm className="size-7" /></a
					>
				</div>
			</div>
		</section>
		<section class="space-y-2">
			<h2 class="text-xl italic">{$release.data?.artist}</h2>

			<p class="flex flex-wrap gap-2 lowercase">
				{#each $artist.data?.tags || [] as tag}
					<span
						class="rounded-md border bg-neutral-100 px-1.5 py-0.5 text-sm italic text-neutral-700"
						>#{tag.replaceAll(' ', '-')}</span
					>
				{/each}
			</p>
		</section>
		<section class="flex items-end justify-between">
			<p class="text-sm italic text-neutral-600">
				you have listened to this album <strong class="font-semibold"
					>{$album.data?.userplays}</strong
				> times
			</p>
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
					<ListPlus className="size-7 text-neutral-700" />
				</button>
			{/if}
		</section>
		<!-- <p class="space-x-2">
					{#each $artist.data?.similar || [] as similar}
						<span>{similar}</span>
					{/each}
				</p> -->
	</header>

	<section>
		{#if $release.data?.tracklist}
			<ul class="space-y-3">
				{#each $release.data.tracklist as { title, duration }}
					<Track {title} {duration} artist={$release.data.artist} album={$release.data.title} />
				{/each}
			</ul>
		{/if}
	</section>
</article>
