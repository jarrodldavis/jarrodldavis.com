<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	const { title, children }: Props = $props();
</script>

<section class="mt-6">
	<h2
		class="mb-2 border-b-2 border-black text-center font-mono text-2xl font-light uppercase sm:text-start sm:text-xl sm:font-extralight dark:border-stone-300"
	>
		{title}
	</h2>

	{@render children()}
</section>
