<script lang="ts">
	import { userQueryClient } from '$lib/query-client';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Logout from '../icons/lucide/logout.svelte';
	import User from '../icons/lucide/user.svelte';
	import Auth from '../auth/auth.form.svelte';

	const { getInfo } = userQueryClient();
	const userInfo = createQuery({ ...getInfo, retry: 0 });

	let menu = $state(null as unknown as HTMLDivElement);
	let show = $state(false);

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			// @ts-expect-error - TS doesn't know about contains
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<header class="flex justify-between p-6 md:p-10">
	<nav class="space-x-5">
		<a href="/" class="text-lg font-semibold italic tracking-wider">uziq</a>
	</nav>

	{#if $userInfo.isLoading}
		<p>Loading...</p>
	{:else if $userInfo.data}
		<div bind:this={menu} class="relative">
			<button onclick={() => (show = !show)}>
				<img src={$userInfo.data.image[2]['#text']} alt="User avatar" class="size-8 rounded-full" />
			</button>

			{#if show}
				<div
					in:scale={{ duration: 100, start: 0.95 }}
					out:scale={{ duration: 75, start: 0.95 }}
					class="absolute right-0 mt-1 w-24 origin-top-right rounded bg-neutral-50
          py-2 text-sm shadow-md"
				>
					<a
						href="/profile"
						class="inline-flex w-full items-center justify-between px-2 py-1 hover:bg-neutral-200"
						>Profile
						<User className="size-4" />
					</a>
					<Auth
						action="logout"
						className="inline-flex w-full items-center justify-between px-2 py-1 hover:bg-neutral-200"
					>
						Logout <Logout className="size-4" />
					</Auth>
				</div>
			{/if}
		</div>
	{/if}
</header>
