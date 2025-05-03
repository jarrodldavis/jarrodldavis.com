<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';
	import Location from '$lib/components/location.svelte';
	import type { Location as LocationType } from '$lib/types';

	type DateRangeType = readonly [start: string, end: string | null];

	interface Props {
		title: string;
		url?: string | null;
		subtitle: LocationType | DateRangeType;
	}

	const { title, url, subtitle }: Props = $props();
</script>

<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
	<h3 class="font-semibold">
		{#if url}
			<a href={url}>{title}</a>
		{:else}
			{title}
		{/if}
	</h3>

	{#if subtitle instanceof Array}
		<p><DateRange start={subtitle[0]} end={subtitle[1]} /></p>
	{:else}
		<Location location={subtitle} />
	{/if}
</hgroup>
