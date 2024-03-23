<script lang="ts">
	import Section from '$lib/Section.svelte';
	import SkillUsage from '$lib/SkillUsage.svelte';
	import type { EducationEntry } from '$lib/server/data';

	interface Props {
		entry: EducationEntry;
	}

	const { entry }: Props = $props();
</script>

<Section>
	{#snippet title()}
		<a href={entry.url}>{entry.name}</a>
	{/snippet}

	<p>
		<em>
			<SkillUsage name="short" url="internal" usage={entry} />
		</em>
	</p>

	<p>
		<strong>{entry.qualification}</strong>
		<br />
		{entry.dates}
	</p>
</Section>
