<script lang="ts" module>
	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});

	const sr_formatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
</script>

<script lang="ts">
	interface Props {
		start: string;
		end: string | null;
	}

	function parse_date(raw: string, kind: 'start' | 'end'): Date {
		const date = new Date(raw);

		if (!date.valueOf()) {
			throw new Error(`invalid ${kind} date`);
		}

		return date;
	}

	let { start, end }: Props = $props();
	const start_date = $derived(parse_date(start, 'start'));
	const end_date = $derived(end ? parse_date(end, 'end') : 'Present');
</script>

<time datetime={start_date.toISOString().split('T')[0]}>
	<span aria-hidden="true">{formatter.format(start_date)}</span>
	<span class="sr-only">{sr_formatter.format(start_date)}</span>
</time>

<span>
	<span aria-hidden="true"> &ndash; </span>
	<span class="sr-only"> through </span>
</span>

{#if end_date instanceof Date}
	<time datetime={end_date.toISOString().split('T')[0]}>
		<span aria-hidden="true">{formatter.format(end_date)}</span>
		<span class="sr-only">{sr_formatter.format(end_date)}</span>
	</time>
{:else}
	<time datetime={new Date().toISOString().split('T')[0]}>
		{end_date}
	</time>
{/if}
