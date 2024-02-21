<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let anchor = $state<HTMLAnchorElement>();
	let ran_fallback = $state(false);

	const { children, ...props } = $props<Omit<HTMLAnchorAttributes, 'target'>>();

	// If the `<iframe>` fails to load the PDF, try `download` in hopes browser will show something
	// useful.
	function fallback() {
		if (!anchor || ran_fallback) {
			return;
		}

		anchor.download = '';
		anchor.click();
	}
</script>

<!-- Can't use `download` here because iOS Safari conveniently ignores it for PDF documents and
	navigates anyway when it's present, even with this iframe hack in place. -->
<a bind:this={anchor} {...props} target="download_iframe">
	{#if children}
		{@render children()}
	{/if}
</a>

<iframe name="download_iframe" onerror={fallback} onload={fallback} title="" />

<style>
	iframe {
		display: none;
	}
</style>
