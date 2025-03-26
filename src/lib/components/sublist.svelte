<script lang="ts" module>
	const formatter = new Intl.ListFormat('en', {
		type: 'unit'
	});
</script>

<script lang="ts">
	interface Props {
		title: string;
		items: string[];
	}

	const { title, items }: Props = $props();
</script>

<span class="font-bold">{title}</span>: {formatter.format(items)}
