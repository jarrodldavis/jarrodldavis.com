<script lang="ts">
	import type { PageProps } from './$types';
	import './app.css';
	import Education from './education.svelte';
	import Heading from './heading.svelte';
	import Intro from './intro.svelte';
	import Metadata from './metadata.svelte';
	import Projects from './projects.svelte';
	import Skills from './skills.svelte';
	import Work from './work.svelte';

	const { data }: PageProps = $props();
</script>

<Metadata base_url={data.base_url} profile={data.resume.profile} images={data.images} />

<main class="mx-auto mb-8 max-w-4xl min-w-80 p-4 sm:p-8 md:p-12">
	<Heading profile={data.resume.profile} />
	<Intro profile={data.resume.profile} />
	<Work work={data.resume.work} />
	<Education education={data.resume.education} />
	<Projects projects={data.resume.projects} />
	<Skills
		skills={data.resume.skills}
		languages={data.resume.languages}
		interests={data.resume.interests}
	/>
</main>
