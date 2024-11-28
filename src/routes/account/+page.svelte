<script lang="ts">
	import Auth from '$lib/components/auth/auth.form.svelte';
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.discogsUser}
	<Auth action="logout" provider="discogs">Logout Discogs</Auth>
{:else}
	<Auth action="login" provider="discogs">Login Discogs</Auth>
{/if}
