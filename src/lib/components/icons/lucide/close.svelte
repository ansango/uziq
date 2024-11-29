<script lang="ts">
	import Svg from '../svg.svelte';
	let { className }: { className?: string } = $props();
</script>

<Svg {className}>
	<path
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M18 6L6 18M6 6l12 12"
	/>
</Svg>
