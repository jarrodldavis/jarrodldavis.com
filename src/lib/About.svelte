<script lang="ts">
	import Section from '$lib/Section.svelte';
	import SkillUsage from '$lib/SkillUsage.svelte';
	import type { IntroEntry } from '$lib/server/data';

	const { list_entries } = $props<{ list_entries: IntroEntry[] }>();
	const resume = '/jarrod-davis-resume.pdf';
</script>

<Section title="About Me">
	<p>
		Hey! I’m Jarrod Davis, a full stack developer and software engineer who enjoys building
		delightful experiences and helpful tools. I’ve worked with numerous languages, frameworks, and
		libraries, with a significant focus on command-line utilities and web applications (frontend and
		backend). Here’s a sampling of the technologies I’ve worked with:
	</p>

	<ul>
		{#each list_entries as entry, index (index)}
			<li>
				<SkillUsage name="short" parts={entry} url="external" />
			</li>
		{/each}
	</ul>

	<p>
		Below you can see more details of my professional and educational experience. You can also
		<a href={resume}>view</a> or <a download href={resume}>download</a> my resume as a PDF.
	</p>
</Section>
