<script lang="ts">
	import List from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import SecondarySection from '$lib/components/secondary-section.svelte';
	import TertiarySection from '$lib/components/tertiary-section.svelte';
	import type { WorkExperience } from '$lib/types';

	interface Props {
		work: WorkExperience[];
	}

	const { work }: Props = $props();
</script>

<PrimarySection title="Work Experience">
	{#each work as experience (experience)}
		<SecondarySection title={experience.company} url={experience.url}>
			{#snippet subtitle()}
				<Location location={experience.location} />
			{/snippet}

			{#each experience.positions as position (position)}
				<TertiarySection
					title={position.title}
					start_date={position.start_date}
					end_date={position.end_date}
				>
					<List items={position.highlights} />
				</TertiarySection>
			{/each}
		</SecondarySection>
	{/each}
</PrimarySection>
