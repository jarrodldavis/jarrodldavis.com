<script lang="ts">
	import github_white from '$lib/images/logos/github-mark-white.svg';
	import github_black from '$lib/images/logos/github-mark.svg';
	import { CustomMedia } from 'open-props/src/media';
</script>

<div class="contents">
	<div class="image">
		<enhanced:img alt="Me" src="$lib/images/memoji.jpg" />
	</div>
	<div class="title">
		<h1>Jarrod Davis</h1>
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
			<enhanced:img class="light" alt="LinkedIn" src="$lib/images/logos/In-Blue-128@2x.png" />
			<enhanced:img class="dark" alt="LinkedIn" src="$lib/images/logos/In-White-128@2x.png" />
		</a>
	</div>
</div>

<style>
	.contents {
		display: grid;
		font-size: var(--font-size-2);
		grid-template: 'image title social' / 1fr var(--size-content-3) 1fr;
		grid-auto-flow: column;
		align-items: center;
		gap: var(--size-fluid-4);

		.image,
		.social {
			max-block-size: var(--size-fluid-7);
			aspect-ratio: var(--ratio-square);
			inline-size: auto;
		}

		.image {
			grid-area: image;
			justify-self: end;
			box-shadow: var(--inner-shadow-4);
			border-radius: var(--radius-round);
			overflow: hidden;
			padding: var(--size-fluid-1);

			img {
				border-radius: var(--radius-round);
			}
		}

		.title {
			grid-area: title;
			display: flex;
			flex-direction: column;
		}

		p {
			font-size: var(--font-size-3);
			font-weight: bold;
			text-wrap: balance;
		}

		.social {
			grid-area: social;
			display: flex;
			flex-direction: column;
			gap: var(--size-fluid-2);
			align-items: center;
			justify-content: center;

			img {
				aspect-ratio: var(--ratio-square);
				block-size: var(--size-8);
				inline-size: auto;

				&.dark {
					display: none;
				}
			}
		}
	}

	@media (--OSdark) {
		.contents .social img {
			&.light {
				display: none;
			}

			&.dark {
				display: block;
			}
		}
	}

	@media (--lg-n-below) {
		.contents {
			grid-template: 'image title social' / var(--size-fluid-7) auto var(--size-fluid-7);
		}
	}

	@media (--md-n-below) {
		.contents {
			grid-template: 'image' 'title' 'social';
			justify-items: center;
			text-align: center;

			.image {
				justify-self: center;
			}

			.title {
				align-items: center;
			}

			p {
				font-size: var(--font-size-4);
			}

			.social {
				aspect-ratio: unset;
				flex-direction: row;
			}
		}

		@media ((--sm-n-below) or ((--md-n-below) and (--landscape))) {
			.contents {
				gap: var(--size-fluid-2);

				.image {
					margin-block-end: calc(-1 * var(--size-fluid-2));
				}
			}
		}
	}
</style>
