<script lang="ts">
</script>

<nav>
	<ul>
		<li><a href="/#">About</a></li>
		<li><a href="/#">Experience</a></li>
		<li><a href="/#">Education</a></li>
		<li><a href="/#">Skills</a></li>
	</ul>
</nav>

<style>
	ul {
		padding-inline-start: 0;
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-1);
	}

	li {
		list-style: none;
		padding-inline-start: 0;
		font-size: var(--font-size-3);
	}

	@media (--sm-n-above) {
		nav {
			display: flex;
			flex-direction: column;
			place-items: center;
		}

		ul {
			flex-direction: row;
			gap: var(--size-fluid-2);
		}
	}
</style>
