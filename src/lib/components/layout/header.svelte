<script lang="ts">
	import Login from '../auth/login.svelte';
	import Logout from '../auth/logout.svelte';

	let { lastfmSession }: { lastfmSession?: string; discogsUser?: string } = $props();
</script>

<header class="flex justify-between p-6 md:p-10">
	<nav class="space-x-5">
		<a href="/" class="text-lg font-semibold italic tracking-wider">uziq</a>
	</nav>
	{#if lastfmSession}
		<Logout />
	{:else}
		<Login />
	{/if}
</header>
