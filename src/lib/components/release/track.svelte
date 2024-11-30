<script lang="ts">
	import { fetcher, parseDuration } from '$lib/utils';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

	import Svg from '../icons/svg.svelte';
	import { addToast } from '$lib/stores';
	import type { Track } from '../../../routes/api/track/mapper';
	import type { ResponsePostTrackScrobble } from '../../../routes/api/track/scrobble/+server';

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
		mutationKey: [artist, title],
		mutationFn: ({ album, artist, track }: { artist: string; album: string; track: string }) =>
			fetcher<ResponsePostTrackScrobble>()(`/api/track/scrobble`, {
				method: 'POST',
				body: JSON.stringify({ album, artist, track })
			}),

		onSuccess: ({ requestParams: { artist, track } }) => {
			addToast({
				message: `${track} ${artist} scrobbled!`,
				type: 'success',
				dismissible: true,
				timeout: 3000
			});

			queryClient.invalidateQueries({ queryKey: ['track', artist, track], exact: true });
			queryClient.invalidateQueries({
				queryKey: ['album', album]
			});
		},
		onError: (error) => {
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
