<script lang="ts">
	import { dismissToast, toasts } from '$lib/stores';
	import Toast from './toast.svelte';
</script>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<style lang="postcss">
	section {
		@apply fixed inset-x-0 top-0 z-10 mt-4 flex w-full flex-col justify-center;
	}
</style>
