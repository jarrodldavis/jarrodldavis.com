<script lang="ts">
	import Heading from './heading.svelte';
	import type { PageProps } from './$types';
	import Intro from './intro.svelte';
	import Work from './work.svelte';
	import Education from './education.svelte';
	import Projects from './projects.svelte';
	import Skills from './skills.svelte';

	const { data }: PageProps = $props();
</script>

<main class="mx-auto mb-8 max-w-4xl min-w-80 p-4 sm:p-8 md:p-12">
	<Heading profile={data.resume.profile} />
	<Intro />
	<Work work={data.resume.work} />
	<Education education={data.resume.education} />
	<Projects projects={data.resume.projects} />
	<Skills
		skills={data.resume.skills}
		languages={data.resume.languages}
		interests={data.resume.interests}
	/>
</main>
