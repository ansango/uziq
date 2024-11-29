<script lang="ts">
	import { createEventDispatcher, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Success from '../icons/lucide/success.svelte';
	import Error from '../icons/lucide/error.svelte';
	import Info from '../icons/lucide/info.svelte';
	import Close from '../icons/lucide/close.svelte';

	type Props = {
		type: 'success' | 'error' | 'info';
		dismissible: boolean;
		dismiss: () => void;
		children: Snippet;
	};

	let { type, dismissible, dismiss, children }: Props = $props();
</script>

<article class={type} role="alert" transition:fade>
	{#if type === 'success'}
		<Success />
	{:else if type === 'error'}
		<Error />
	{:else}
		<Info />
	{/if}

	<div class="line-clamp-1">
		{@render children()}
	</div>

	{#if dismissible}
		<button class="close" onclick={dismiss}>
			<Close />
		</button>
	{/if}
</article>

<style lang="postcss">
	article {
		@apply mx-auto mb-2 mt-0 flex w-80 items-center gap-2 rounded-sm p-3 text-neutral-800;
	}
	.error {
		@apply bg-red-200 text-rose-600;
	}
	.success {
		@apply bg-green-200 text-emerald-800;
	}
	.info {
		@apply bg-blue-200 text-sky-800;
	}

	button {
		@apply my-0 ml-auto mr-0 border-0 border-none bg-transparent p-0 text-base leading-none;
	}
</style>
