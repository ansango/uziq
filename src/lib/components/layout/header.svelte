<script lang="ts">
	import Login from '../auth/login.svelte';
	import Logout from '../auth/logout.svelte';

	let { discogsUser, lastfmSession }: { lastfmSession?: string; discogsUser?: string } = $props();
</script>

<header class="flex justify-between p-5">
	<nav class="space-x-5">
		<a href="/">Home</a>

		{#if lastfmSession}
			<a href="/profile">Profile</a>
			<a href="/track">Tracks</a>
		{/if}

		{#if discogsUser && lastfmSession}
			<a href="/release">Vinyls</a>
		{/if}
	</nav>
	{#if lastfmSession}
		<Logout />
	{:else}
		<Login />
	{/if}
</header>
