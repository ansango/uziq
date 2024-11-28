<script lang="ts">
	import { useInfiniteGetReleases, useInfiniteScroll } from '$lib/hooks';
	const query = useInfiniteGetReleases(12);
	const infiniteScroll = useInfiniteScroll();

	let elementRef: HTMLElement;
	$: {
		if (
			elementRef &&
			$query.hasNextPage &&
			!$query.isLoading &&
			!$query.isFetchingNextPage &&
			!$query.isFetching
		) {
			infiniteScroll({
				action: () => {
					setTimeout(() => $query.fetchNextPage(), 1500);
				},
				element: elementRef
			});
		}
	}
</script>

<section class="space-y-2">
	<ul class="grid grid-cols-12 gap-1 md:gap-2">
		{#if $query.data}
			{#each $query.data.pages as { releases }}
				{#each releases as release}
					<li class="col-span-4 md:col-span-3 lg:col-span-2">
						<a href={`/release/${release.id}`} class="">
							<img
								class="aspect-square object-sm w-full rounded-sm object-cover"
								src={release.cover_image}
								alt={release.title + ' by ' + release.artist}
							/>
						</a>
					</li>
				{/each}
			{/each}
		{/if}
	</ul>

	<div bind:this={elementRef}>
		{#if $query.isFetching && $query.hasNextPage}
			<ul class="grid grid-cols-12 gap-1 md:gap-2">
				{#each new Array(12) as _, i}
					<li class="col-span-4 md:col-span-3 lg:col-span-2">
						<div class="aspect-square w-full animate-pulse rounded-sm bg-neutral-300"></div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
