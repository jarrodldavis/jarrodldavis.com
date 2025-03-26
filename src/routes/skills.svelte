<script lang="ts" module>
	import List from '$lib/components/list.svelte';
	import PrimarySection from '$lib/components/primary-section.svelte';
	import Sublist from '$lib/components/sublist.svelte';
	import type { Language, SkillCategory } from '$lib/types';

	const LANGUAGES_ITEM = Symbol();
	const INTERESTS_ITEM = Symbol();

	function format_language(language: Language): string {
		return `${language.language} (${language.proficiency})`;
	}
</script>

<script lang="ts">
	interface Props {
		skills: SkillCategory[];
		languages: Language[];
		interests: string[];
	}

	const { skills, languages, interests }: Props = $props();
	const items = (
		[
			languages.length ? LANGUAGES_ITEM : false,
			...skills,
			interests.length ? INTERESTS_ITEM : false
		] as const
	).filter((item) => item !== false);
</script>

<PrimarySection title="Skills, Languages, and Interests">
	<List {items}>
		{#snippet item(item)}
			{#if item === LANGUAGES_ITEM}
				<Sublist title="Languages" items={languages.map(format_language)} />
			{:else if item === INTERESTS_ITEM}
				<Sublist title="Interests" items={interests} />
			{:else}
				<Sublist title={item.category} items={item.skills} />
			{/if}
		{/snippet}
	</List>
</PrimarySection>
