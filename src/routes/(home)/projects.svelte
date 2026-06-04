<script lang="ts">
	import List from '$lib/components/list.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import SecondarySection from '$lib/components/secondary-section.svelte';
	import TertiarySection from '$lib/components/tertiary-section.svelte';
	import type { ProjectExperience } from '$lib/types';

	interface Props {
		projects: ProjectExperience[];
	}

	const { projects }: Props = $props();
</script>

<PrimarySection title="Projects">
	{#each projects as project (project)}
		<SecondarySection title={project.name} url={project.url}>
			{#snippet subtitle()}{/snippet}

			<TertiarySection
				title={project.affiliation}
				subtitle={null}
				start_date={project.start_date}
				end_date={project.end_date}
			>
				<List items={project.highlights} />
			</TertiarySection>
		</SecondarySection>
	{/each}
</PrimarySection>
