<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	type Props = {
		id: string;
	};
	let { id }: Props = $props();
</script>
