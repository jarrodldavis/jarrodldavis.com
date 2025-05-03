<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';

	interface Props {
		title: string;
		start_date: string;
		end_date: string | null;
	}

	const { title, start_date, end_date }: Props = $props();
</script>

<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
	<h4 class="italic">{title}</h4>
	<p><DateRange start={start_date} end={end_date} /></p>
</hgroup>
