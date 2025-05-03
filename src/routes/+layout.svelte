<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	injectAnalytics();
	injectSpeedInsights();
</script>

{@render children()}
