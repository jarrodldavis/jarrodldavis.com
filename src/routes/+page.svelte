<script lang="ts">
	const { data } = $props();

	$effect(() => {
		console.log(data.resume);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
