<script lang="ts" module>
	import List from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import SecondarySection from '$lib/components/secondary-section.svelte';
	import Sublist from '$lib/components/sublist.svelte';
	import TertiarySection from '$lib/components/tertiary-section.svelte';
	import type { EducationExperience } from '$lib/types';

	const HONORS_ITEM = Symbol();
	const COURSES_ITEM = Symbol();

	function items(education: EducationExperience) {
		return (
			[
				education.honors.length ? HONORS_ITEM : false,
				education.courses.length ? COURSES_ITEM : false,
				...education.highlights
			] as const
		).filter((item) => item !== false);
	}
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
				start_date={experience.start_date}
				end_date={experience.end_date}
			>
				<List items={items(experience)}>
					{#snippet item(item)}
						{#if item === HONORS_ITEM}
							<Sublist title="Honors" items={experience.honors} />
						{:else if item === COURSES_ITEM}
							<Sublist title="Courses" items={experience.courses} />
						{:else}
							{item}
						{/if}
					{/snippet}
				</List>
			</TertiarySection>
		</SecondarySection>
	{/each}
</PrimarySection>
