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
		display: flex;
		align-items: center;
		gap: var(--size-fluid-4);
		justify-content: center;

		.image {
			flex-shrink: 0;
			block-size: var(--size-fluid-7);
			aspect-ratio: var(--ratio-square);
			inline-size: auto;
			box-shadow: var(--inner-shadow-4);
			border-radius: var(--radius-round);
			overflow: hidden;
			padding: var(--size-fluid-1);

			img {
				border-radius: var(--radius-round);
			}
		}

		.title {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			font-size: var(--font-size-2);
			max-inline-size: var(--size-content-3);
		}

		p {
			font-size: var(--font-size-3);
			font-weight: bold;
			text-wrap: balance;
		}

		.social {
			display: flex;
			flex-shrink: 0;
			gap: var(--size-5);

			img {
				flex-shrink: 0;
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
				display: unset;
			}
		}
	}

	@media (--lg-n-below) {
		p {
			max-inline-size: var(--size-content-2);
		}
	}

	@media (--md-n-below) {
		.contents {
			justify-content: center;
			text-align: center;
			flex-wrap: wrap;

			.image {
				block-size: var(--size-fluid-8);
				max-block-size: 100%;
			}

			.title {
				align-items: center;
			}

			p {
				font-size: var(--font-size-4);
			}
		}
	}
</style>
