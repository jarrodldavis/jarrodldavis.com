<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import List, { type Item } from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import type { PageProps } from './$types';
	import './app.css';
	import './fonts.scss';
	import PrimaryHeading from './primary-heading.svelte';
	import SecondaryHeading from './secondary-heading.svelte';
	import TertiaryHeading from './tertiary-heading.svelte';
	import { url_display } from './utils';

	const top_margin = $derived(dev ? page.url.searchParams.get('top-margin') : null);

	let { data }: PageProps = $props();
	const resume = $derived(data.resume);
	const profile = $derived(resume.profile);
	const work = $derived(resume.work);
	const education = $derived(resume.education);
	const projects = $derived(resume.projects);
	const skills = $derived(resume.skills.map<Item>((skill) => [skill.category, skill.skills]));
</script>

<main
	style:--top-margin={top_margin}
	class="bg-white font-serif text-xs leading-tight text-black **:[section]:mb-1"
>
	<header class="mb-2 flex flex-col items-center text-center font-sans text-sm">
		<h1 class="font-mono text-3xl leading-none font-bold">{profile.name}</h1>

		<ul class="*:delimiter-slash flex gap-1 font-medium *:contents">
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
						title="{experience.degree} in {experience.major}"
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
				<SecondaryHeading title={project.name} url={project.url} subtitle={null} />

				<TertiaryHeading
					title={project.affiliation}
					start_date={project.start_date}
					end_date={project.end_date}
				/>

				<List items={project.highlights} tight />
			</section>
		{/each}
	</section>

	<section>
		<PrimaryHeading title="Skills" />
		<List items={skills} tight />
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
