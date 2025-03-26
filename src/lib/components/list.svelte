<script lang="ts" generics="Item">
	import type { Snippet } from 'svelte';

	interface Props {
		item: Snippet<[Item]>;
		items: Item[];
	}

	const { item: snippet, items }: Props = $props();
</script>

{#if items.length}
	<ul class="ml-4 list-outside list-disc text-pretty">
		{#each items as item (item)}
			<li class="mb-1">
				{@render snippet(item)}
			</li>
		{/each}
	</ul>
{/if}
