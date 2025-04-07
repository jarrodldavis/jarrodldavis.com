<script lang="ts">
	import type { Profile } from '$lib/types';
	import memoji from '$lib/memoji.png?enhanced';

	interface Props {
		profile: Profile;
	}

	const formatter = new Intl.ListFormat('en-US', { type: 'conjunction' });
	const { profile }: Props = $props();

	const url = profile.url;
	const title = profile.name;
	const short_description = formatter.format(profile.titles);
	const long_description = profile.intro;

	const og_alt = `A Memoji of me in a green circle next to my name (${title}) and job titles (${short_description}).`;
	const tw_alt = 'A Memoji of me in a green circle.';

	const tw_height = memoji.img.h.toString();
	const tw_width = memoji.img.w.toString();
	const icon_size = `${memoji.img.w}x${memoji.img.h}`;
</script>

<svelte:head>
	<title>{title} | {short_description}</title>
	<meta name="description" content={long_description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={short_description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content={url} />
	<meta property="og:image:alt" content={og_alt} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image" content="{url}/opengraph-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={short_description} />
	<meta name="twitter:image:alt" content={tw_alt} />
	<meta name="twitter:image:type" content="image/png" />
	<meta name="twitter:image" content="{url}/twitter-icon.png" />
	<meta name="twitter:image:width" content={tw_width} />
	<meta name="twitter:image:height" content={tw_height} />

	<link rel="icon" href="/favicon.png" type="image/png" sizes={icon_size} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" sizes={icon_size} />
</svelte:head>
