<script lang="ts">
	import { useInfiniteGetReleases } from '$lib/hooks';
	const query = useInfiniteGetReleases(12);
</script>

{#if $query.data}
	<ul class="grid grid-cols-12 gap-1 md:gap-2">
		{#each $query.data.pages as { releases }}
			{#each releases as release}
				<li class="col-span-4 md:col-span-3 lg:col-span-2 2xl:col-span-1">
					<a href={`/release/${release.id}`}>
						<img
							width="256"
							height="256"
							src={release.cover_image}
							alt={release.title + ' by ' + release.artist}
						/>
					</a>
				</li>
			{/each}
		{/each}
	</ul>
{/if}
<button
	on:click={() => $query.fetchNextPage()}
	disabled={!$query.hasNextPage || $query.isFetchingNextPage}
>
	{#if $query.isFetching}
		Loading more...
	{:else if $query.hasNextPage}
		Load More
	{:else}Nothing more to load{/if}
</button>
