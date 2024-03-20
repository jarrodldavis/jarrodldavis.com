<script lang="ts">
	import github_white from '$lib/images/social/github-mark-white.svg';
	import github_black from '$lib/images/social/github-mark.svg';
	import { CustomMedia } from 'open-props/src/media';
	import Nav from './Nav.svelte';
</script>

<header>
	<div class="logo">
		<enhanced:img alt="Me" src="$lib/images/memoji.jpg" />
	</div>

	<div class="title">
		<h1>Jarrod Davis</h1>
	</div>

	<div class="subtitle">
		<p>Software engineer, scripting specialist, and full stack web developer</p>
	</div>

	<div class="social">
		<a href="https://github.com/jarrodldavis">
			<picture>
				<source media={CustomMedia['--OSdark']} srcset={github_white} />
				<source media={CustomMedia['--OSlight']} srcset={github_black} />
				<img alt="GitHub" height="96" src={github_black} width="98" />
			</picture>
		</a>
		<a href="https://www.linkedin.com/in/jarrodldavis">
			<enhanced:img class="light" alt="LinkedIn" src="$lib/images/social/In-Blue-128@2x.png" />
			<enhanced:img class="dark" alt="LinkedIn" src="$lib/images/social/In-White-128@2x.png" />
		</a>
	</div>

	<div class="nav">
		<Nav />
	</div>
</header>

<style>
	header {
		padding-block: var(--safe-area-inset-block-start) var(--size-fluid-3);
		padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
		background-color: var(--surface-2);
		box-shadow: var(--shadow-4);
		display: grid;
		font-size: var(--font-size-2);
		text-align: center;
		place-items: center;
		gap: var(--size-fluid-2);
		grid-template:
			'logo     logo'
			'title    title'
			'subtitle subtitle'
			'social   nav'
			/ 1fr 2fr;
	}

	.logo {
		grid-area: logo;
		box-shadow: var(--inner-shadow-4);
		border-radius: var(--radius-round);
		padding: var(--size-fluid-2);
		margin-inline: var(--size-fluid-2);
		max-block-size: var(--size-fluid-8);
		aspect-ratio: var(--ratio-square);

		img {
			border-radius: var(--radius-round);
		}
	}

	.title {
		grid-area: title;
	}

	h1 {
		font-size: var(--font-size-6);
		margin-block: var(--size-relative-000);
		line-height: 1;
	}

	.subtitle {
		grid-area: subtitle;

		p {
			text-wrap: balance;
			max-inline-size: var(--size-content-2);
		}
	}

	.social {
		grid-area: social;
		justify-self: end;
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-2);
		place-content: center;
		inline-size: max-content;

		a {
			flex-shrink: 0;
		}

		img {
			aspect-ratio: var(--ratio-square);
			block-size: var(--size-8);
			inline-size: auto;

			&.dark {
				display: none;
			}
		}
	}

	.nav {
		grid-area: nav;
		text-align: start;
	}

	@media (--OSdark) {
		.social img {
			&.light {
				display: none;
			}

			&.dark {
				display: block;
			}
		}
	}

	@media (--sm-n-above) {
		header {
			grid-template:
				'leading logo   title    trailing' auto
				'leading logo   subtitle trailing' auto
				'leading rowgap rowgap   trailing' var(--size-fluid-2)
				'leading social nav      trailing' auto
				/
				auto
				minmax(min-content, var(--size-fluid-7))
				min-content
				auto;
			text-align: start;
			gap: 0;
		}

		.logo {
			justify-self: end;
			padding: var(--size-fluid-1);
			margin: 0;
			margin-inline-end: var(--size-fluid-1);
			max-block-size: var(--size-fluid-7);
		}

		.title,
		.subtitle {
			justify-self: start;
		}

		h1 {
			margin-block: unset;
			white-space: nowrap;
		}

		.social {
			justify-self: unset;
			flex-direction: row;
			margin-inline-end: var(--size-fluid-1);
		}

		.social img {
			block-size: var(--size-7);
		}

		nav {
			justify-self: start;
		}
	}

	@media (--md-n-above) {
		header {
			padding: 0;
			padding-block-start: var(--safe-area-inset-block-start);
			grid-template:
				'leading logo   title    social trailing' 1fr
				'leading logo   subtitle social trailing' 1fr
				'nav     nav    nav      nav    nav'
				/
				minmax(var(--safe-area-inset-inline-start), 1fr)
				max-content
				min-content
				max-content
				minmax(var(--safe-area-inset-inline-end), 1fr);
		}

		.logo {
			margin-inline-end: var(--size-fluid-2);
		}

		h1 {
			font-size: var(--font-size-8);
		}

		.social {
			flex-direction: column;
			margin-inline: var(--size-fluid-2) 0;
			inline-size: var(--size-fluid-7);
			align-items: center;

			img {
				block-size: var(--size-8);
			}
		}

		.nav {
			justify-self: stretch;
			margin-block-start: var(--size-fluid-2);
			padding: var(--size-fluid-1);
			border-block-start: var(--border-size-2) solid var(--surface-3);
		}
	}

	@media (--lg-n-above) {
		.logo {
			margin: 0;
		}

		.title,
		.subtitle {
			justify-self: center;
			text-align: center;
		}

		.title {
			align-self: end;
		}

		.subtitle {
			align-self: start;
			inline-size: var(--size-content-3);

			p {
				max-inline-size: unset;
				font-size: var(--font-size-3);
			}
		}

		.social {
			align-items: start;
		}
	}
</style>
