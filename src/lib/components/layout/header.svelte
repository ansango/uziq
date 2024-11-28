<script lang="ts">
	import Login from '../auth/login.svelte';
	import Logout from '../auth/logout.svelte';

	let { discogsUser, lastfmSession }: { lastfmSession?: string; discogsUser?: string } = $props();
</script>

<header class="flex justify-between p-5">
	<nav class="space-x-5">
		<a href="/" class="text-lg font-semibold italic tracking-wider">uziq</a>

		{#if lastfmSession}
			<a
				class="font-medium italic tracking-widest hover:underline hover:underline-offset-2"
				href="/account">account</a
			>
			<a
				class="font-medium italic tracking-widest hover:underline hover:underline-offset-2"
				href="/track">tracks</a
			>
		{/if}

		{#if discogsUser && lastfmSession}
			<a
				class="font-medium italic tracking-widest hover:underline hover:underline-offset-2"
				href="/release">vinyls</a
			>
		{/if}
	</nav>
	{#if lastfmSession}
		<Logout />
	{:else}
		<Login />
	{/if}
</header>
