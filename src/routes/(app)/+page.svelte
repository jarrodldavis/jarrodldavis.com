<script lang="ts">
	import About from '$lib/About.svelte';
	import Education from '$lib/Education.svelte';
	import Experience from '$lib/Experience.svelte';
	import Section from '$lib/Section.svelte';
	import { set_skills } from '$lib/SkillUsage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	set_skills(data.skills);
</script>

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
