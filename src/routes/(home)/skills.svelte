<script lang="ts" module>
	import List, { type Item } from '$lib/components/list.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import type { Language, SkillCategory } from '$lib/types';
</script>

<script lang="ts">
	interface Props {
		skills: SkillCategory[];
		languages: Language[];
		interests: string[];
	}

	let { skills: raw_skills, languages: raw_languages, interests }: Props = $props();
	const skills = $derived(raw_skills.map<Item>((skill) => [skill.category, skill.skills]));
	const languages = $derived(raw_languages.map((l) => `${l.language} (${l.proficiency})`));
</script>

<PrimarySection title="Skills, Languages, and Interests">
	<List items={[['Languages', languages], ...skills, ['Interests', interests]]} />
</PrimarySection>
