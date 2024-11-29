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

	//const dispatch = createEventDispatcher();
	let { type, dismissible, dismiss, children }: Props = $props();
	//export let type = 'error';
	//	export let dismissible = true;
</script>

<article class={type} role="alert" transition:fade>
	{#if type === 'success'}
		<Success />
	{:else if type === 'error'}
		<Error />
	{:else}
		<Info />
	{/if}

	<div class="text">
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
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		margin: 0 auto 0.5rem auto;
		width: 20rem;
	}
	.error {
		background: IndianRed;
	}
	.success {
		background: MediumSeaGreen;
	}
	.info {
		background: SkyBlue;
	}
	.text {
		margin-left: 1rem;
	}
	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
	}
</style>
