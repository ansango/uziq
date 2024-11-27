<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { clientApi } from '$lib';
	const {
		getReleases: { queryFn, queryKey }
	} = clientApi();

	const vinyls = createQuery({
		queryKey,
		queryFn,
		select(data) {
			return {
				vinyls: data.releases.map((release) => {
					return {
						title: release.basic_information.title,
						artist: release.basic_information.artists[0].name,
						year: release.basic_information.year,
						cover_image: release.basic_information.cover_image,
						id: release.id,
						tracks: release.basic_information.tracklist
					};
				})
			};
		},
		staleTime: 1000 * 60 * 5
	});
</script>

{#if $vinyls.isFetching}
	<p>Loading...</p>
{:else if $vinyls.isError}
	<p>Error: {$vinyls.error.message}</p>
{:else}
	<h1>Vinyls</h1>
	<ul>
		{#if !$vinyls.data}
			<p>No vinyls found</p>
		{:else}
			{#each $vinyls.data.vinyls as vinyl}
				<li>
					<a href={`/release/${vinyl.id}`}>
						{vinyl.title} - {vinyl.artist} - {vinyl.year}
					</a>
					<img width="256" height="256" src={vinyl.cover_image} alt="thumb" />
				</li>
			{/each}
		{/if}
	</ul>
{/if}
