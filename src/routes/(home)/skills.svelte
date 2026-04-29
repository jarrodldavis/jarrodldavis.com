<script lang="ts" module>
	import List, { type Item } from '$lib/components/list.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import type { SkillCategory } from '$lib/types';
</script>

<script lang="ts">
	interface Props {
		skills: SkillCategory[];
	}

	let { skills: raw_skills }: Props = $props();
	const skills = $derived(raw_skills.map<Item>((skill) => [skill.category, skill.skills]));
</script>

<PrimarySection title="Skills">
	<List items={skills} />
</PrimarySection>
