<script lang="ts" module>
	const date_formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});

	const list_formatter = new Intl.ListFormat('en', {
		type: 'unit'
	});

	type DateRange = readonly [start: string, end: string | null];
</script>

<script lang="ts">
	import type { Location } from '$lib/types';

	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const resume = data.resume;
	const profile = resume.profile;
	const work = resume.work;
	const education = resume.education;
	const projects = resume.projects;
	const skills = resume.skills;
	const languages = resume.languages;
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

{#snippet secondary_heading(title: string, url: string | null, subtitle: Location | DateRange)}
	<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
		<h3 class="font-semibold">
			{#if url}
				<a href={url}>{title}</a>
			{:else}
				{title}
			{/if}
		</h3>

		{#if subtitle instanceof Array}
			{@render date_range(subtitle[0], subtitle[1])}
		{:else}
			<p class="font-semibold">{subtitle.city}, {subtitle.state}</p>
		{/if}
	</hgroup>
{/snippet}

{#snippet tertiary_heading(title: string, start_date: string, end_date: string | null)}
	<hgroup class="flex break-inside-avoid break-after-avoid justify-between">
		<h4 class="italic">{title}</h4>
		{@render date_range(start_date, end_date)}
	</hgroup>
{/snippet}

{#snippet date_range(start: string, end: string | null)}
	{@const start_date = new Date(start)}
	{@const end_date = end ? new Date(end) : 'Present'}

	<p>
		{date_formatter.format(start_date)}
		&ndash;
		{end_date instanceof Date ? date_formatter.format(end_date) : end_date}
	</p>
{/snippet}

<main class="bg-white font-serif text-sm leading-tight text-black **:[section]:mb-2">
	<header class="mb-2 flex flex-col items-center text-center">
		<h1 class="text-4xl font-black">{profile.name}</h1>

		<ul class="*:delimiter-slash flex gap-1 font-semibold *:contents">
			{#each profile.titles as title (title)}
				<li>{title}</li>
			{/each}
		</ul>

		<p>{profile.location.city}, {profile.location.state}</p>

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

						<ul class="ml-4 list-outside list-disc">
							{#each position.highlights as highlight (highlight)}
								<li>{highlight}</li>
							{/each}
						</ul>
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

					<ul class="ml-4 list-outside list-disc">
						{#if experience.honors.length}
							<li>
								<span class="font-bold">Honors</span>:
								{list_formatter.format(experience.honors)}
							</li>
						{/if}

						{#if experience.courses.length}
							<li>
								<span class="font-bold">Courses</span>:
								{list_formatter.format(experience.courses)}
							</li>
						{/if}

						{#each experience.highlights as highlight (highlight)}
							<li>{highlight}</li>
						{/each}
					</ul>
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

				<ul class="ml-4 list-outside list-disc">
					{#each project.highlights as highlight (highlight)}
						<li>{highlight}</li>
					{/each}
				</ul>
			</section>
		{/each}
	</section>

	<section>
		{@render primary_heading('Skills, Languages, Interests')}

		<ul>
			{#if languages.length}
				{@const formatted_languages = languages.map(
					({ language, proficiency }) => `${language} (${proficiency})`
				)}

				<li>
					<span class="font-bold">Languages</span>:
					{list_formatter.format(formatted_languages)}
				</li>
			{/if}

			{#each skills as category (category)}
				<li>
					<span class="font-bold">{category.category}</span>:
					{list_formatter.format(category.skills)}
				</li>
			{/each}

			{#if interests.length}
				<li>
					<span class="font-bold">Interests</span>:
					{list_formatter.format(interests)}
				</li>
			{/if}
		</ul>
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
