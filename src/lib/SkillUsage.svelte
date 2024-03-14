<script context="module" lang="ts">
	import type { SkillUsage, Skills } from '$lib/server/data';
	import { getContext, setContext } from 'svelte';

	interface Props {
		usage: SkillUsage;
		name: 'long' | 'short';
		url: 'internal' | 'external';
	}

	const SKILLS_CONTEXT_KEY = Symbol('skills context');

	export function set_skills(skills: Skills) {
		setContext(SKILLS_CONTEXT_KEY, skills);
	}

	function get_skills() {
		const skills = getContext<Skills | undefined>(SKILLS_CONTEXT_KEY);
		if (!skills) {
			throw new Error('skills not provided in context');
		}
		return skills;
	}
</script>

<script lang="ts">
	const { usage, url: url_kind, name: name_kind }: Props = $props();
	const skills = get_skills();

	function get_skill(id: string) {
		const skill = skills.get(id);
		if (!skill) {
			throw new Error(`unknown skill identifier '${id}'`);
		}

		const name = name_kind === 'long' ? skill.name.long : skill.name.short;

		if (url_kind === 'internal') {
			// TODO
			return { name, url: `#` };
		}

		if (!skill.url) {
			throw new Error(`skill '${id}' has no external URL`);
		}

		return { name, url: skill.url };
	}
</script>

{#each usage.description as part, index (index)}
	{#if 'skill_id' in part}
		{@const { name, url } = get_skill(part.skill_id)}
		<a href={url}>{name}</a>
	{:else}
		{part.literal}
	{/if}
{/each}
