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
		d="M11 12H3m13-6H3m13 12H3m15-9v6m3-3h-6"
	/>
</Svg>
