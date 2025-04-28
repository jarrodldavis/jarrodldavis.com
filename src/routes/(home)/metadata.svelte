<script lang="ts">
	import type { ImageInfo, Profile } from '$lib/types';

	interface Props {
		profile: Profile;
		images: {
			opengraph: ImageInfo;
			twitter: ImageInfo;
			favicon_ico: ImageInfo;
			favicon_png: ImageInfo;
			apple: ImageInfo;
		};
	}

	const formatter = new Intl.ListFormat('en-US', { type: 'conjunction' });
	const { profile, images }: Props = $props();
	const { opengraph, twitter, favicon_ico, favicon_png, apple } = images;
	const base_url = profile.url;
	const name = profile.name;
	const titles = formatter.format(profile.titles);

	function url(info: ImageInfo): string {
		return `${base_url}/${info.name}?${info.hash}`;
	}

	function href(info: ImageInfo): string {
		return `/${info.name}?${info.hash}`;
	}

	function size(info: ImageInfo): string {
		return `${info.width}x${info.height}`;
	}
</script>

<svelte:head>
	<title>{name} | {titles}</title>
	<meta name="description" content={profile.intro} />
	<link rel="canonical" href={base_url} />

	<meta property="og:title" content={name} />
	<meta property="og:description" content={titles} />
	<meta property="og:url" content={base_url} />
	<meta property="og:site_name" content={new URL(base_url).hostname} />
	<meta property="og:type" content="website" />
	<meta
		property="og:image:alt"
		content="A Memoji of me in a green circle next to my name ({name}) and job titles ({titles})."
	/>
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image" content={url(opengraph)} />
	<meta property="og:image:width" content={opengraph.width} />
	<meta property="og:image:height" content={opengraph.height} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={name} />
	<meta name="twitter:description" content={titles} />
	<meta name="twitter:image:alt" content="A Memoji of me in a green circle." />
	<meta name="twitter:image:type" content="image/png" />
	<meta name="twitter:image" content={url(twitter)} />
	<meta name="twitter:image:width" content={twitter.width} />
	<meta name="twitter:image:height" content={twitter.height} />

	<link rel="icon" href={href(favicon_ico)} type="image/x-icon" sizes={size(favicon_ico)} />
	<link rel="icon" href={href(favicon_png)} type="image/png" sizes={size(favicon_png)} />
	<link rel="apple-touch-icon" href={href(apple)} type="image/png" sizes={size(apple)} />
</svelte:head>
