<script lang="ts">
	import { fetcher, parseDuration } from '$lib/utils';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

	import Svg from '../icons/svg.svelte';
	import { addToast } from '$lib/stores';
	import type { Track } from '../../../routes/api/track/mapper';
	import type { ResponsePostTrackScrobble } from '../../../routes/api/track/scrobble/+server';
	import type { MappedAlbum } from '../../../routes/api/album/mapper';

	type Props = {
		title: string;
		duration: number;
		artist: string;
		album: string;
	};

	let { duration, title, artist, album }: Props = $props();

	const track = createQuery({
		queryKey: ['track', artist, title],
		queryFn: () =>
			fetcher<Track>()(`/api/track`, {
				method: 'POST',
				body: JSON.stringify({ artist, track: title })
			})
	});

	const queryClient = useQueryClient();
	const addMutation = createMutation({
		mutationKey: ['track', artist, title],
		mutationFn: ({ album, artist, track }: { artist: string; album: string; track: string }) =>
			fetcher<ResponsePostTrackScrobble>()(`/api/track/scrobble`, {
				method: 'POST',
				body: JSON.stringify({ album, artist, track })
			}),

		onMutate: ({ artist, track }) => {
			queryClient.cancelQueries({ queryKey: ['track', artist, track] });
			const previousAlbum = queryClient.getQueryData<MappedAlbum>(['album', album]);
			const previousTrack = queryClient.getQueryData<Track>(['track', artist, track]);
			if (previousTrack) {
				queryClient.setQueryData<Track>(['track', artist, track], {
					...previousTrack,
					userplaycount: previousTrack?.userplaycount + 1
				});
			}

			if (previousAlbum) {
				queryClient.setQueryData<MappedAlbum>(['album', album], {
					...previousAlbum,
					userplays: previousAlbum?.userplays + 1
				});
			}

			return { previousTrack, previousAlbum };
		},

		onSuccess: ({ requestParams: { artist, track } }) => {
			addToast({
				message: `${track} ${artist} scrobbled!`,
				type: 'success',
				dismissible: true,
				timeout: 3000
			});
		},
		onError: (error, variables, context) => {
			if (context?.previousTrack) {
				queryClient.setQueryData<Track>(['track', artist, title], context.previousTrack);
			}
			if (context?.previousAlbum) {
				queryClient.setQueryData<MappedAlbum>(['album', album], context.previousAlbum);
			}

			addToast({
				message: error.message,
				type: 'error',
				dismissible: true,
				timeout: 3000
			});
		}
	});
</script>

<li class="border-b border-neutral-200 py-1">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-2">
			<span class="text-sm text-neutral-500">
				{duration !== 0 ? parseDuration(duration) : parseDuration($track.data?.duration || 0)}
			</span>
			<span class=" line-clamp-1 text-neutral-700">{title}</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="text-sm text-neutral-600">{$track.data?.userplaycount}</span>

			<button
				class="text-neutral-700"
				disabled={$addMutation.status === 'pending'}
				onclick={() => $addMutation.mutate({ artist, album, track: title })}
			>
				<Svg className="size-6 inline-flex mb-0.5"
					><g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						><circle cx="12" cy="12" r="10" /><path d="M6 12c0-1.7.7-3.2 1.8-4.2" /><circle
							cx="12"
							cy="12"
							r="2"
						/><path d="M18 12c0 1.7-.7 3.2-1.8 4.2" /></g
					></Svg
				>
			</button>
		</div>
	</div>
</li>
