<script lang="ts">
	import { clientApi } from '$lib';
	import { createQuery } from '@tanstack/svelte-query';
	const { getProfile } = clientApi();
	const { queryFn, queryKey } = getProfile;
	const profile = createQuery({
		queryKey,
		queryFn,
		staleTime: 1000 * 60 * 5
	});
</script>

{#if $profile.isFetching}
	<p>Loading...</p>
{:else if $profile.isError}
	<p>Error: {$profile.error.message}</p>
{:else}
	<h1>username: {$profile.data?.user.name}</h1>
	<p>trackcount: {$profile.data?.user.track_count}</p>
	<p>album count: {$profile.data?.user.album_count}</p>
	<p>artist count: {$profile.data?.user.artist_count}</p>
	<img
		width="174"
		height="174"
		src={$profile.data?.user.image?.filter((image) => image.size === 'large')[0]['#text']}
		alt="avatar"
	/>
{/if}
