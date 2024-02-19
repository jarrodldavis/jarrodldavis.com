<script lang="ts">
	import { inject as injectAnalytics } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import type { Snippet } from 'svelte';
	import './global.css';

	injectAnalytics();
	injectSpeedInsights();

	const { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
