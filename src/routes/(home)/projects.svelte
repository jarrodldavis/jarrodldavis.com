<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';
	import List from '$lib/components/list.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import SecondarySection from '$lib/components/secondary-section.svelte';
	import type { ProjectExperience } from '$lib/types';

	interface Props {
		projects: ProjectExperience[];
	}

	const { projects }: Props = $props();
</script>

<PrimarySection title="Projects">
	{#each projects as project (project)}
		<SecondarySection title={project.name} url={project.url}>
			{#snippet subtitle()}
				<p class="font-mono tracking-tight text-nowrap">
					<DateRange start={project.start_date} end={project.end_date} />
				</p>
			{/snippet}

			<List items={project.highlights} />
		</SecondarySection>
	{/each}
</PrimarySection>
