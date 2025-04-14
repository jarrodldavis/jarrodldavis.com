<script lang="ts" module>
	import List from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import SecondarySection from '$lib/components/secondary-section.svelte';
	import TertiarySection from '$lib/components/tertiary-section.svelte';
	import type { EducationExperience } from '$lib/types';
</script>

<script lang="ts">
	interface Props {
		education: EducationExperience[];
	}

	const { education }: Props = $props();
</script>

<PrimarySection title="Education">
	{#each education as experience (experience)}
		<SecondarySection title={experience.institution} url={experience.url}>
			{#snippet subtitle()}
				<Location location={experience.location} />
			{/snippet}

			<TertiarySection
				title="{experience.degree} in {experience.major}"
				subtitle={null}
				start_date={experience.start_date}
				end_date={experience.end_date}
			>
				<List
					items={[
						['Honors', experience.honors],
						['Courses', experience.courses],
						...experience.highlights
					]}
				/>
			</TertiarySection>
		</SecondarySection>
	{/each}
</PrimarySection>
