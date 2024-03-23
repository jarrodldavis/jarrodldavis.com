<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import Nav from './Nav.svelte';

	let wrapper = $state<HTMLDivElement>();
	let dialog = $state<HTMLDialogElement>();
	let popover = $state<HTMLDivElement>();

	// Required because:
	// - Firefox doesn't support `popover` and toggling a `<dialog>` requires manually invoking
	//   `show`/`close` methods.
	function toggle_dialog() {
		if (!dialog) {
			return;
		}

		if (dialog.open) {
			dialog.close();
		} else {
			dialog.show();
		}
	}

	function dismiss() {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		popover?.hidePopover?.();
		dialog?.close();
	}

	// Required because:
	// - Safari on iOS doesn't light dismiss popovers when tapping on popover backdrop
	//   https://bugs.webkit.org/show_bug.cgi?id=267688
	// - Firefox doesn't support `popover` and `<dialog>` does not have light dismiss
	function onpointerdown({ target }: PointerEvent) {
		if (!wrapper || !(target instanceof HTMLElement) || wrapper.contains(target)) {
			return;
		}

		dismiss();
	}

	// Required because:
	// - Firefox doesn't support `popover` and non-modal `<dialog>`s do not have `Esc`-dismiss
	function onkeydown({ key }: KeyboardEvent) {
		if (key === 'Escape') {
			dismiss();
		}
	}

	afterNavigate(() => {
		dismiss();
	});
</script>

<svelte:document {onkeydown} {onpointerdown} />

{#snippet open_button()}
	<button
		class="round open"
		aria-label="Open Navigation Menu"
		onclick={!browser || 'popover' in HTMLElement.prototype ? null : toggle_dialog}
		popovertarget="nav-popover"
		type="button"
	>
		<svg viewBox="0 0 90 90">
			<line x1="0" x2="90" y1="15" y2="15" />
			<line x1="0" x2="90" y1="45" y2="45" />
			<line x1="0" x2="90" y1="75" y2="75" />
		</svg>
	</button>
{/snippet}

{#snippet close_button()}
	<button
		class="round close"
		aria-label="Close Navigation Menu"
		onclick={!browser || 'popover' in HTMLElement.prototype ? null : toggle_dialog}
		popovertarget="nav-popover"
		type="button"
	>
		<svg viewBox="0 0 100 100">
			<line x1="10" x2="90" y1="90" y2="10" />
			<line x1="10" x2="90" y1="10" y2="90" />
		</svg>
	</button>
{/snippet}

<div class="margin-fix" />

<footer>
	<div class="col">
		{@render open_button()}

		<div bind:this={wrapper} class="nav-wrapper">
			<div bind:this={popover} id="nav-popover" popover="auto">
				<Nav />
				{@render close_button()}
			</div>

			<dialog bind:this={dialog}>
				<Nav />
				{@render close_button()}
			</dialog>
		</div>
	</div>

	<div class="row">
		<Nav />
	</div>
</footer>

<style>
	.margin-fix {
		margin-block-start: -125vb;
	}

	footer {
		margin-block-start: 125vb;
		position: sticky;
		inset-block-end: 0;
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		padding-block: var(--size-fluid-3) var(--safe-area-inset-block-end);
	}

	.row {
		display: none;
	}

	.col {
		position: relative;
	}

	.nav-wrapper {
		position: absolute;
		inset-block-end: 100%;
		width: 100%;

		& > * {
			position: fixed;
			inset-inline: 0;
			inset-block-start: unset;
			inset-block-end: 0;
			margin: 0;
			width: 100%;
			padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
			padding-block: var(--size-fluid-3) var(--safe-area-inset-block-end);
			border-start-start-radius: var(--radius-3);
			border-start-end-radius: var(--radius-3);
			border-end-start-radius: 0;
			border-end-end-radius: 0;
			background-color: var(--surface-2);

			&::backdrop {
				backdrop-filter: none;
			}
		}
	}

	button.round {
		position: absolute;
		border-radius: var(--radius-round);
		padding: 0;

		&.open {
			inset-block-end: 0;
			inset-inline-end: 0;
			width: var(--size-relative-10);
			height: var(--size-relative-10);
		}

		&.close {
			inset-block-start: var(--size-fluid-3);
			inset-inline-end: var(--safe-area-inset-inline-end);
			width: var(--size-relative-9);
			height: var(--size-relative-9);
		}

		line {
			stroke: var(--_icon-color);
			stroke-width: var(--border-size-4);
		}
	}

	@supports (not selector(:popover-open)) {
		#nav-popover {
			display: none;
		}
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
