<script lang="ts">
	import Section from '$lib/Section.svelte';
	import SkillUsage from '$lib/SkillUsage.svelte';
	import type { ExperienceEntry } from '$lib/server/data';

	const { entry } = $props<{ entry: ExperienceEntry }>();
</script>

{#snippet job_title(title: typeof entry['titles'][number])}
	<p>
		<strong>{title.name}</strong>
		<br />
		{title.dates}
	</p>
{/snippet}

<Section>
	{#snippet title()}
		<a href={entry.url}>{entry.company}</a>
	{/snippet}

	<p><em>{entry.product}</em></p>

	{#if entry.titles.length === 1}
		{@render job_title(entry.titles[0])}
	{:else}
		<ul>
			{#each entry.titles as title, index (index)}
				<li>{@render job_title(title)}</li>
			{/each}
		</ul>
	{/if}

	<Section title="Responsibilities">
		<ul>
			{#each entry.responsibilities as { description }, index (index)}
				<li>
					<SkillUsage name="short" parts={description} url="internal" />
				</li>
			{/each}
		</ul>
	</Section>
</Section>
