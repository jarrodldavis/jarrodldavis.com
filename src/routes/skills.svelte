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

	const props: Props = $props();
	const skills = props.skills.map<Item>((skill) => [skill.category, skill.skills]);
	const languages = props.languages.map((l) => `${l.language} (${l.proficiency})`);
	const interests = props.interests;
</script>

<PrimarySection title="Skills, Languages, and Interests">
	<List items={[['Languages', languages], ...skills, ['Interests', interests]]} />
</PrimarySection>
