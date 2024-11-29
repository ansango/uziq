<script lang="ts">
	import type { PageData } from './$types';
	import Svg from '$lib/components/icons/svg.svelte';
	import {
		useGetReleaseById,
		usePostTrackBatchScrobble,
		usePostTrackScrobble
	} from '$lib/query-client';
	import TrackCounter from '$lib/components/release/track.counter.svelte';

	let { data }: { data: PageData } = $props();
	const { id, queryClient } = data;

	const release = useGetReleaseById(id);
	const scrobbleBatch = usePostTrackBatchScrobble({ id, queryClient });
	const scrobbleTrack = usePostTrackScrobble({ id, queryClient });
</script>

{#if $release.isFetching}
	<p>Loading...</p>
{:else if $release.isError}
	<p>Error: {$release.error.message}</p>
{:else}
	<div class="max-w-md space-y-8">
		<header class="space-y-8">
			<img
				class="aspect-square rounded-sm object-cover"
				src={$release.data?.albumMetadata?.cover}
				alt={$release.data?.album + ' by ' + $release.data?.artist}
			/>
			<div class="flex justify-between gap-2 md:gap-4">
				<div class="w-full space-y-2">
					<h1 class="flex items-center justify-between text-2xl">
						{$release.data?.album}
						<span>
							<time class="text-sm italic text-neutral-500"
								>{$release.data?.albumMetadata.year}</time
							>
							<span class="ml-0.5 text-sm italic text-neutral-500"
								><Svg className="size-4 inline-flex mb-0.5"
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
									>
								</Svg>
								played - {$release.data?.albumMetadata.stats.userplaycount}
							</span>
						</span>
					</h1>
					<h2 class="text-xl">{$release.data?.artist}</h2>
					{#if $release.data?.artistMetadata.tags.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each $release.data.artistMetadata.tags as tag}
								<span class="rounded-full bg-neutral-100 px-2 py-1 text-sm text-neutral-800"
									>{tag.name}</span
								>
							{/each}
						</div>
					{/if}
				</div>
				<button
					class="mt-2 inline-flex"
					onclick={() =>
						$scrobbleBatch.mutate({
							id,
							artist: $release.data?.artist as string,
							album: $release.data?.album as string,
							tracklist: $release.data?.albumMetadata.tracks.map((track) => ({
								name: track.name as string
							})) as { name: string }[]
						})}
					disabled={$scrobbleBatch.status === 'pending'}
					aria-label="Scrobble"
				>
					<Svg className="size-6 text-neutral-800">
						{#if $scrobbleBatch.status === 'pending'}
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
								d="M11 12H3m13-6H3m13 12H3m15-9v6m3-3h-6"
							/>
						{/if}
					</Svg>
				</button>
			</div>
		</header>
		{#if $release.data?.albumMetadata?.tracks}
			<ul class="space-y-2">
				{#each $release.data.albumMetadata.tracks as track}
					<li class="flex justify-between border-b py-1">
						<span class="line-clamp-1">{track.name}</span>
						<div class="flex items-center gap-2">
							{#if track.duration !== '0:00'}
								<span class="text-sm text-neutral-500">{track.duration}</span>
							{/if}
							<TrackCounter name={track.name} />
							<button
								onclick={() =>
									$scrobbleTrack.mutate({
										artist: $release.data.artist,
										track: track.name,
										album: $release.data.album
									})}
								disabled={$scrobbleTrack.status === 'pending' &&
									$scrobbleTrack.variables.track === track.name}
								aria-label="Scrobble"
							>
								<Svg className="size-5 text-neutral-800">
									{#if $scrobbleTrack.status === 'pending' && $scrobbleTrack.variables.track === track.name}
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
										<g
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											><circle cx="12" cy="12" r="10" /><path d="M8 12h8m-4-4v8" /></g
										>
									{/if}
								</Svg>
							</button>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}
