<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import List, { type Item } from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import type { PageProps } from './$types';
	import './app.css';
	import PrimaryHeading from './primary-heading.svelte';
	import SecondaryHeading from './secondary-heading.svelte';
	import TertiaryHeading from './tertiary-heading.svelte';

	const top_margin = $derived(dev ? page.url.searchParams.get('top-margin') : null);

	const { data }: PageProps = $props();
	const resume = data.resume;
	const profile = resume.profile;
	const work = resume.work;
	const education = resume.education;
	const projects = resume.projects;
	const skills = resume.skills.map<Item>((skill) => [skill.category, skill.skills]);
	const languages = resume.languages.map((l) => `${l.language} (${l.proficiency})`);
	const interests = resume.interests;

	function url_display(raw_url: string) {
		const url = new URL(raw_url);
		return (url.hostname + url.pathname).replace(/\/$/, '');
	}
</script>

<main
	style:--top-margin={top_margin}
	class="bg-white font-serif text-sm leading-tight text-black **:[section]:mb-2"
>
	<header class="mb-2 flex flex-col items-center text-center">
		<h1 class="text-4xl font-black">{profile.name}</h1>

		<ul class="*:delimiter-slash flex gap-1 font-semibold *:contents">
			{#each profile.titles as title (title)}
				<li>{title}</li>
			{/each}
		</ul>

		<Location location={profile.location} />

		<ul class="*:delimiter-dot flex items-center gap-1 *:contents *:after:text-xs">
			<li><a href="mailto:{profile.email}">{profile.email}</a></li>
			<li><a href={profile.url}>{url_display(profile.url)}</a></li>
			{#each profile.networks as network (network)}
				<li><a href={network.url}>{url_display(network.url)}</a></li>
			{/each}
		</ul>
	</header>

	<section>
		<PrimaryHeading title="Work Experience" />

		{#each work as experience (experience)}
			<section>
				<SecondaryHeading
					title={experience.company}
					url={experience.url}
					subtitle={experience.location}
				/>

				{#each experience.positions as position (position)}
					<section>
						<TertiaryHeading
							title={position.title}
							start_date={position.start_date}
							end_date={position.end_date}
						/>

						<List items={position.highlights} tight />
					</section>
				{/each}
			</section>
		{/each}
	</section>

	<section>
		<PrimaryHeading title="Education" />

		{#each education as experience (experience)}
			<section>
				<SecondaryHeading
					title={experience.institution}
					url={experience.url}
					subtitle={experience.location}
				/>

				<section>
					<TertiaryHeading
						title={experience.degree}
						start_date={experience.start_date}
						end_date={experience.end_date}
					/>

					<List
						items={[
							['Honors', experience.honors],
							['Courses', experience.courses],
							...experience.highlights
						]}
						tight
					/>
				</section>
			</section>
		{/each}
	</section>

	<section>
		<PrimaryHeading title="Projects" />

		{#each projects as project (project)}
			<section>
				<SecondaryHeading
					title={project.name}
					url={project.url}
					subtitle={[project.start_date, project.end_date]}
				/>

				<List items={project.highlights} tight />
			</section>
		{/each}
	</section>

	<section>
		<PrimaryHeading title="Skills, Languages, Interests" />
		<List items={[['Languages', languages], ...skills, ['Interests', interests]]} tight />
	</section>
</main>

<style>
	@page {
		size: portrait letter;
		margin: 0.5in;
	}

	@media screen {
		main {
			box-sizing: border-box;
			width: 8.5in;
			height: 11in;
			padding: 0.5in;
			margin: var(--top-margin, 0) auto 0px auto;
			overflow-y: scroll;
		}
	}
</style>
