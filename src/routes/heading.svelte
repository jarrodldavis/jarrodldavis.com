<script lang="ts">
	import type { Profile } from '$lib/types';

	interface Props {
		profile: Profile;
	}

	const { profile }: Props = $props();
	const links = [
		{ url: `mailto:${profile.email}`, text: profile.email },
		...profile.networks.map(({ url, network }) => ({ url, text: network }))
	];
</script>

<div class="2xs:gap-0 tall:2xs:gap-4 xs:gap-4 flex flex-col items-center gap-2 text-center">
	<div
		class="tall:flex-col max-2xs:flex-col 2xs:gap-3 flex flex-row items-center gap-2 text-center"
	>
		<h1 class="font-mono text-4xl font-black">{profile.name}</h1>
	</div>

	<div
		class="tall:2xs:gap-4 xs:gap-4 xs:max-md:flex-row flex flex-col items-center justify-center gap-2"
	>
		<ul role="list" class="tall:gap-y-1 flex flex-col font-semibold md:flex-row md:gap-2 lg:gap-3">
			{#each profile.titles as title (title)}
				<li class="md:delimiter-slash contents after:font-mono">
					{title}
				</li>
			{/each}
		</ul>

		<ul
			role="list"
			class="tall:gap-y-1 flex flex-col font-mono md:flex-row md:gap-3 md:tracking-tighter md:max-lg:text-sm lg:gap-4 lg:tracking-tight"
		>
			{#each links as link (link.url)}
				<li class="md:delimiter-diamond contents">
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-900 hover:text-blue-700 hover:underline dark:text-blue-100 dark:hover:text-blue-300"
					>
						{link.text}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
