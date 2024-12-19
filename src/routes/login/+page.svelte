<script lang="ts">
	import Auth from '$lib/components/auth/auth.form.svelte';
	import Discogs from '$lib/components/icons/brands/discogs.svelte';
	import Lastfm from '$lib/components/icons/brands/lastfm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex justify-center space-y-5">
	{#if !data.lastfmSession || !data.discogsToken}
		<div class="relative max-h-full w-full max-w-md p-4 text-neutral-800">
			<div class="relative rounded-lg bg-neutral-100">
				<div class="flex items-center justify-between rounded-t border-b p-4 md:p-5">
					<h3 class="text-xl font-semibold">
						Sign in <span class="italic">uziq</span>
					</h3>
					<div>
						<Lastfm className="inline size-7" />
						<Discogs className="inline size-6" />
					</div>
				</div>
				<!-- Modal body -->
				<div class="space-y-5 p-4 md:p-5">
					<p>
						You need to sign in to your Last.fm and Discogs accounts to use our platform. If you
						don't have an account, you can create both for free.
					</p>
					<p>
						First you will be redirected to Last.fm to sign in and then to Discogs. After that you
						will be able to use our platform.
					</p>
					<Auth
						action="login"
						className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Login</Auth
					>
				</div>
			</div>
		</div>
	{/if}
</section>
