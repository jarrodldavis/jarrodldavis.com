<script lang="ts" module>
	export type Item =
		| string
		| [title: string, content: string]
		| { title: string; content: string }
		| [title: string, subitems: string[]];

	const formatter = new Intl.ListFormat('en-US', { type: 'unit' });

	function extract_title_and_content(item: Item): [title: string | null, content: string] {
		if (typeof item === 'string') {
			return [null, item];
		} else if (Array.isArray(item)) {
			return [item[0], typeof item[1] === 'string' ? item[1] : formatter.format(item[1])];
		} else {
			return [item.title, item.content];
		}
	}
</script>

<script lang="ts">
	interface Props {
		items: Item[];
		tight?: boolean;
	}

	const { items, tight = false }: Props = $props();
</script>

{#if items.length}
	<ul class="ml-4 list-outside list-disc text-pretty">
		{#each items as item (item)}
			{@const [title, content] = extract_title_and_content(item)}

			{#if content.length}
				<li class={{ 'mb-1': !tight }}>
					{#if title}
						<span class="font-bold">{title}</span>:
					{/if}

					{content}
				</li>
			{/if}
		{/each}
	</ul>
{/if}
