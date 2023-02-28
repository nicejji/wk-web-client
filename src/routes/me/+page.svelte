<script lang="ts">
	import PixelEditor from '$lib/PixelEditor.svelte';
	const pixelData = JSON.stringify(
		Array.from({ length: 16 }, (_) => Array(16).fill('rgba(0, 0, 0, 0)'))
	);
</script>

<PixelEditor {pixelData} />
