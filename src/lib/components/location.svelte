<script lang="ts">
	import type { Location } from '$lib/types';

	interface Props {
		location: Location;
	}

	const { location }: Props = $props();
</script>

<p class="font-semibold">
	{location.city}, {location.state}
	{#if location.remote}
		<span class="text-sm font-normal italic">(Remote)</span>
	{/if}
</p>
