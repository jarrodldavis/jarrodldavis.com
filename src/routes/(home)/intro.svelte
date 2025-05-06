<script lang="ts">
	import type { Profile } from '$lib/types';

	interface Props {
		profile: Profile;
	}

	const { profile }: Props = $props();
</script>

<section class="mt-6 space-y-2">
	<p>{profile.intro}</p>
	<p>
		Below you can see more details of my professional and educational experience. You can also
		<a
			class="underline hover:text-blue-700 dark:hover:text-blue-300"
			href="/jarrod-davis-resume.pdf"
			download="jarrod-davis-resume.pdf"
		>
			download my resume
		</a>
		as a PDF.
	</p>
</section>
