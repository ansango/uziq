<script lang="ts">
	import Auth from '$lib/components/auth/auth.form.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="space-y-5">
	{#if !data.lastfmSession || !data.discogsToken}
		<Auth action="login">Login</Auth>
	{/if}
</section>
