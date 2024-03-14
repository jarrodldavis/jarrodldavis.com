<script lang="ts">
	import get_heading_level from '$lib/heading';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title: Snippet | string;
	}

	const { children, title }: Props = $props();
	const heading = `h${get_heading_level()}`;
</script>

<!-- eslint-disable-next-line svelte/no-restricted-html-elements -->
<section>
	<svelte:element this={heading}>
		{#if typeof title === 'string'}
			{title}
		{:else}
			{@render title()}
		{/if}
	</svelte:element>

	{@render children()}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}

	section > :global(*) {
		margin-block-end: var(--size-fluid-2);
	}

	:is(h1, h2, h3, h4, h5, h6) {
		margin-block-end: var(--size-fluid-1);
	}
</style>
