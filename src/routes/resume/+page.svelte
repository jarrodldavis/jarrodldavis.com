<script lang="ts">
	import DateRange from '$lib/components/date-range.svelte';
	import List, { type Item } from '$lib/components/list.svelte';
	import Location from '$lib/components/location.svelte';
	import type { Location as LocationType } from '$lib/types';
	import type { PageProps } from './$types';

	type DateRangeType = readonly [start: string, end: string | null];
	type Subtitle = LocationType | DateRangeType;

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

{#snippet primary_heading(title: string)}
	<h2 class="mb-1 break-inside-avoid break-after-avoid border-b text-lg font-semibold uppercase">
		{title}
	</h2>
{/snippet}

{#snippet secondary_heading(title: string, url: string | null, subtitle: Subtitle)}
	<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
		<h3 class="font-semibold">
			{#if url}
				<a href={url}>{title}</a>
			{:else}
				{title}
			{/if}
		</h3>

		{#if subtitle instanceof Array}
			<p><DateRange start={subtitle[0]} end={subtitle[1]} /></p>
		{:else}
			<Location location={subtitle} />
		{/if}
	</hgroup>
{/snippet}

{#snippet tertiary_heading(title: string, start_date: string, end_date: string | null)}
	<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
		<h4 class="italic">{title}</h4>
		<p><DateRange start={start_date} end={end_date} /></p>
	</hgroup>
{/snippet}

<main class="bg-white font-serif text-sm leading-tight text-black **:[section]:mb-2">
	<header class="mb-2 flex flex-col items-center text-center">
		<h1 class="text-4xl font-black">{profile.name}</h1>

		<ul class="*:delimiter-slash flex gap-1 font-semibold *:contents">
			{#each profile.titles as title (title)}
				<li>{title}</li>
			{/each}
		</ul>

		<Location location={profile.location} />

		<ul class="*:delimiter-diamond flex items-center gap-2 *:contents *:after:text-xs">
			<li><a href="mailto:{profile.email}">{profile.email}</a></li>
			<li><a href={profile.url}>{url_display(profile.url)}</a></li>
			{#each profile.networks as network (network)}
				<li><a href={network.url}>{url_display(network.url)}</a></li>
			{/each}
		</ul>
	</header>

	<section>
		{@render primary_heading('Work Experience')}

		{#each work as experience (experience)}
			<section>
				{@render secondary_heading(experience.company, experience.url, experience.location)}

				{#each experience.positions as position (position)}
					<section>
						{@render tertiary_heading(position.title, position.start_date, position.end_date)}
						<List items={position.highlights} tight />
					</section>
				{/each}
			</section>
		{/each}
	</section>

	<section>
		{@render primary_heading('Education')}

		{#each education as experience (experience)}
			<section>
				{@render secondary_heading(experience.institution, experience.url, experience.location)}

				<section>
					{@render tertiary_heading(experience.degree, experience.start_date, experience.end_date)}
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
		{@render primary_heading('Projects')}

		{#each projects as project (project)}
			{@const date_range = [project.start_date, project.end_date] as const}

			<section>
				{@render secondary_heading(project.name, project.url, date_range)}
				<List items={project.highlights} tight />
			</section>
		{/each}
	</section>

	<section>
		{@render primary_heading('Skills, Languages, Interests')}
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
			margin: 0px auto;
			overflow-y: scroll;
		}
	}
</style>
