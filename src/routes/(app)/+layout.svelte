<script lang="ts">
	import '$lib/styles.css';
	import { inject as injectAnalytics } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	injectAnalytics();
	injectSpeedInsights();

	const { children }: Props = $props();
</script>

{@render children()}
