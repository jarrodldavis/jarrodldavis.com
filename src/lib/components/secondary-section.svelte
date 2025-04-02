<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		url: string | null;
		subtitle: Snippet;
		children: Snippet;
	}

	const { title, url, subtitle, children }: Props = $props();
</script>

<section class="mb-6">
	<hgroup class="flex flex-col gap-1 text-center sm:flex-row sm:justify-between sm:text-start">
		<h3 class="text-lg font-bold text-balance">
			{#if url}
				<a href={url} target="_blank" rel="noopener noreferrer">
					{title}
				</a>
			{:else}
				{title}
			{/if}
		</h3>

		{@render subtitle()}
	</hgroup>

	{@render children()}
</section>
