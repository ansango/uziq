<script lang="ts">
	import { fetcher, parseDuration } from '$lib/utils';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import type { Track } from '../../../routes/api/track/[artist]/[track]/mapper';

	import Svg from '../icons/svg.svelte';
	import { addToast } from '$lib/stores';
	import type { ResponsePostTrackScrobble } from '../../../routes/api/track/[artist]/[track]/+server';

	type Props = {
		title: string;
		duration: number;
		artist: string;
		album: string;
	};

	let { duration, title, artist, album }: Props = $props();

	const track = createQuery({
		queryKey: [artist, title],
		queryFn: () => fetcher<Track>()(`/api/track/${artist}/${title}`)
	});
	const queryClient = useQueryClient();
	const addMutation = createMutation({
		mutationKey: [artist, title],
		mutationFn: ({ album, artist, track }: { artist: string; album: string; track: string }) =>
			fetcher<ResponsePostTrackScrobble>()(`/api/track/${artist}/${track}/?album=${album}`, {
				method: 'POST'
			}),
		onSuccess: ({ requestParams: { album, artist, track } }) => {
			addToast({
				message: `${track} scrobbled!`,
				type: 'success',
				dismissible: true,
				timeout: 3000
			});

			queryClient.invalidateQueries({ queryKey: [artist, track] });
		}
	});
</script>

<li>
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-2">
			<span class="text-sm text-neutral-500"
				>{duration !== 0
					? parseDuration(duration)
					: parseDuration($track.data?.duration || 0)}</span
			>
			<span class="text-sm text-neutral-500">{title}</span>
		</div>
		<div>
			{#if $track.isFetching}
				<span class="text-sm text-neutral-500">Loading...</span>
			{:else}
				<span class="text-sm text-neutral-500">{$track.data?.userplaycount}</span>
			{/if}

			<button
				class="text-sm text-neutral-500"
				disabled={$addMutation.status === 'pending'}
				onclick={() => $addMutation.mutate({ artist, album, track: title })}
			>
				<Svg className="size-4 inline-flex mb-0.5"
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
