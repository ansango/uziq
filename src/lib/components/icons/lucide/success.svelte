<script lang="ts">
	import Svg from '../svg.svelte';
	let { className }: { className?: string } = $props();
</script>

<Svg {className}>
	<g
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11l3 3L22 4" /></g
	>
</Svg>
