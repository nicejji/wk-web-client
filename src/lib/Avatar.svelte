<script lang="ts">
	import PixelView from './PixelView.svelte';
	export let image: string;
</script>

<PixelView
	asImage={true}
	pixels={JSON.parse(image)}
	class={'aspect-square ' + $$props.class}
	style={$$props.style}
/>
