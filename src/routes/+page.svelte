<script lang="ts">
	import About from '$lib/About.svelte';
	import Education from '$lib/Education.svelte';
	import Experience from '$lib/Experience.svelte';
	import HeaderContents from '$lib/HeaderContents.svelte';
	import Section from '$lib/Section.svelte';
	import { set_skills } from '$lib/SkillUsage.svelte';
	import { set_heading_level } from '$lib/heading';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	set_skills(data.skills);
	set_heading_level(1);
</script>

<main>
	<header>
		<HeaderContents />
	</header>

	<article>
		<About list_entries={data.intro} />

		<Section title="Experience">
			{#each data.experience as entry, index (index)}
				<Experience {entry} />
			{/each}
		</Section>

		<Section title="Education">
			{#each data.education as entry, index (index)}
				<Education {entry} />
			{/each}
		</Section>
	</article>
</main>

<svelte:head>
	<!-- var(--surface-2) -->
	<meta name="theme-color" content="rgb(233, 236, 239)" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(52, 58, 64)" media="(prefers-color-scheme: dark)" />
</svelte:head>

<style>
	:root {
		--safe-area-inset-block-start: max(env(safe-area-inset-top, 0), var(--size-fluid-3));
		--safe-area-inset-block-end: max(env(safe-area-inset-bottom, 0), var(--size-fluid-3));
		--safe-area-inset-inline-start: max(env(safe-area-inset-left, 0), var(--size-fluid-3));
		--safe-area-inset-inline-end: max(env(safe-area-inset-right, 0), var(--size-fluid-3));
	}

	header {
		padding-block: var(--safe-area-inset-block-start) var(--size-fluid-3);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		background-color: var(--surface-2);
		box-shadow: var(--shadow-3);
	}

	article {
		padding-block: var(--safe-area-inset-block-start) var(--safe-area-inset-block-end);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		box-sizing: content-box;
		font-size: var(--font-size-2);
		max-inline-size: calc(var(--size-content-3));
		margin: 0 auto;
	}

	article :global(li) {
		margin-block-end: var(--size-relative-1);
	}
</style>
