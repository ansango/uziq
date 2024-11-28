<script lang="ts">
	import { clientApi } from '$lib';
	import { createQuery, createMutation } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import Svg from '$lib/components/icons/svg.svelte';

	let { data }: { data: PageData } = $props();

	const { getRelease, postBatchTrackScrobble, getRecentTracks } = clientApi();
	const { queryKey, queryFn } = getRelease;
	const release = createQuery({
		queryKey: queryKey(data.id),
		queryFn: () => queryFn(data.id),
		enabled: !!data.id,
		select: (data) => ({ ...data, artist: data.artists[0].name.replace(/\(\d+\)/g, '').trim() })
	});

	const addMutation = createMutation({
		mutationKey: postBatchTrackScrobble.mutationKey(data.id),
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

{#if $release.isFetching}
	<p>Loading...</p>
{:else if $release.isError}
	<p>Error: {$release.error.message}</p>
{:else}
	<div class="max-w-lg space-y-5">
		<header class="flex justify-between">
			<div class="space-y-2">
				<h1 class="text-2xl">{$release.data.title}</h1>
				<h2 class="text-xl">{$release.data.artist}</h2>
				<time class="text-neutral-600">{$release.data.year}</time>
			</div>
			<button
				onclick={() => $addMutation.mutate($release.data)}
				disabled={$addMutation.status === 'pending'}
				aria-label="Scrobble"
			>
				<Svg className="size-6 text-neutral-800">
					{#if $addMutation.status === 'pending'}
						<path
							fill="currentColor"
							d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"
							><animateTransform
								attributeName="transform"
								dur="1.5s"
								repeatCount="indefinite"
								type="rotate"
								values="0 12 12;360 12 12"
							/></path
						>
					{:else}
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 2a10 10 0 0 1 7.38 16.75M12 8v8m4-4H8M2.5 8.875a10 10 0 0 0-.5 3M2.83 16a10 10 0 0 0 2.43 3.4M4.636 5.235a10 10 0 0 1 .891-.857M8.644 21.42a10 10 0 0 0 7.631-.38"
						/>
					{/if}
				</Svg>
			</button>
		</header>
		<ul class="space-y-2">
			{#each $release.data.tracklist as track}
				<li class="border-b py-1">
					{track.title}{track.duration && ` - ${track.duration}`}
				</li>
			{/each}
		</ul>
	</div>
{/if}
