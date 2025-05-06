<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		subtitle: string | null;
		start_date: string;
		end_date: string | null;
		children: Snippet;
	}

	const { title, subtitle, start_date, end_date, children }: Props = $props();
</script>

<section class="mt-1 mb-4">
	<hgroup
		class="mb-2 grid gap-x-6 gap-y-1 text-center sm:grid-cols-[minmax(min-content,max-content)_min-content] sm:justify-between sm:text-start"
	>
		<h4 class="text-balance italic">{title}</h4>
		{#if subtitle}
			<p class="col-span-full text-balance italic sm:order-1">{subtitle}</p>
		{/if}
		<p class="font-mono tracking-tight text-nowrap">
			<DateRange start={start_date} end={end_date} />
		</p>
	</hgroup>

	{@render children()}
</section>
