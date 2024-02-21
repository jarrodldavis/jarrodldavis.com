<script lang="ts">
	import About from './About.svelte';
	import HeaderContents from './HeaderContents.svelte';
</script>

<main>
	<header>
		<HeaderContents />
	</header>

	<article>
		<About />
		<section>
			<h2>Experience</h2>
			<p>TODO</p>
		</section>
	</article>
</main>

<svelte:head>
	<!-- var(--surface-2) -->
	<meta name="theme-color" content="rgb(233, 236, 239)" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(52, 58, 64)" media="(prefers-color-scheme: dark)" />
</svelte:head>

<style>
	:root {
		--safe-area-inset-block-start: max(env(safe-area-inset-top, 0), var(--size-fluid-3));
		--safe-area-inset-block-end: max(env(safe-area-inset-bottom, 0), var(--size-fluid-3));
		--safe-area-inset-inline-start: max(env(safe-area-inset-left, 0), var(--size-fluid-3));
		--safe-area-inset-inline-end: max(env(safe-area-inset-right, 0), var(--size-fluid-3));
	}

	header {
		padding-block: var(--safe-area-inset-block-start) var(--size-fluid-3);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		background-color: var(--surface-2);
		box-shadow: var(--shadow-3);
	}

	article {
		padding-block: var(--safe-area-inset-block-start) var(--safe-area-inset-block-end);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		display: grid;
		place-content: center;
		gap: var(--size-fluid-3);
	}

	article :global(section) {
		display: grid;
		gap: var(--size-fluid-2);
		min-inline-size: min(100%, var(--size-content-3));
	}

	article :global(li) {
		margin-block-end: var(--size-relative-1);
	}
</style>
