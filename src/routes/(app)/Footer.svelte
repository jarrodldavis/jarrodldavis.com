<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Nav from './Nav.svelte';

	let details = $state<HTMLDetailsElement>();

	afterNavigate(() => {
		if (details) {
			details.open = false;
		}
	});
</script>

<footer>
	<div class="col">
		<details bind:this={details}>
			<summary>Jarrod Davis</summary>

			<Nav />
		</details>
	</div>

	<div class="row">
		<Nav />
	</div>
</footer>

<style>
	/* TODO: push below the fold instead of showing immediately */
	footer {
		position: sticky;
		inset-block-end: 0;
		background-color: var(--surface-1);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		padding-block: var(--size-fluid-3) var(--safe-area-inset-block-end);
	}

	.row {
		display: none;
	}

	@media (--sm-n-above) {
		footer {
			background-color: var(--surface-2);
		}

		.col {
			display: none;
		}

		.row {
			display: block;
		}
	}
</style>
