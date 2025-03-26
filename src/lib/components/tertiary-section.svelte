<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		start_date: string;
		end_date: string | null;
		children: Snippet;
	}

	const { title, start_date, end_date, children }: Props = $props();
</script>

<section class="mt-1 mb-4">
	<hgroup
		class="mb-2 flex flex-col gap-1 text-center sm:mb-1 sm:flex-row sm:justify-between sm:text-start"
	>
		<h4 class="text-balance italic min-[850px]:max-w-xl sm:max-w-sm md:max-w-md">{title}</h4>
		<DateRange start={start_date} end={end_date} />
	</hgroup>

	{@render children()}
</section>
