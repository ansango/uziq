<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Svg from '../icons/svg.svelte';
	import { fetcher } from '$lib/utils';
	import type { Track } from '../../../routes/api/track/[artist]/[track]/mapper';

	let { name, artist, album }: { name: string; artist: string; album: string } = $props();

	const generateRandomNumber = () => Math.floor(Math.random() * 100);

	const track = createQuery({
		queryKey: ['track', name, artist, album],
		queryFn: () => fetcher<Track>()(`/api/track/${artist}/${name}`)
	});
</script>

<span class="text-sm italic text-neutral-500">
	{#if $track.isFetching}
		Loading...
	{:else}
		{$track.data?.userplaycount}
	{/if}
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
		>
	</Svg>
</span>
