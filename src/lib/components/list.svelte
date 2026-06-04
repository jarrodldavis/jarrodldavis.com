<script lang="ts" module>
	export interface Item {
		title?: string;
		content: string | string[];
		omit?: 'pdf'[];
	}

	const formatter = new Intl.ListFormat('en-US', { type: 'unit' });
</script>

<script lang="ts">
	interface Props {
		items: Item[];
		tight?: boolean;
		omit?: 'pdf'[];
	}

	const { items, tight = false, omit }: Props = $props();

	function omitItem(item: Item): boolean {
		if (!omit || !item.omit) {
			return false;
		}

		return item.omit.some((omitValue) => omit.includes(omitValue));
	}
</script>

{#if items.length}
	<ul class="ml-4 list-outside list-disc text-pretty">
		{#each items as item (item)}
			{#if item.content.length && !omitItem(item)}
				<li class={{ 'mb-1': !tight }}>
					{#if item.title}
						<span class="font-semibold">{item.title}</span>:
					{/if}

					{#if Array.isArray(item.content)}
						{formatter.format(item.content)}
					{:else}
						{item.content}
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
{/if}
