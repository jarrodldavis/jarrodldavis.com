<script lang="ts">
	interface Props {
		title: string;
	}

	const { title }: Props = $props();
</script>

<h2 class="mb-1 break-inside-avoid break-after-avoid border-b text-lg font-semibold uppercase">
	{title}
</h2>
