<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { variants } from '@catppuccin/palette';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let colors: number[];
	export let palette = Object.entries(variants.mocha).map(([_, v]) => v.hex);
	export let gridShown: boolean = false;
	export let pixelSelection = false;
	const segments = colors.length ** 0.5;

	let theme: string;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let observer: MutationObserver;
	let currentX: number;
	let currentY: number;

	const getPixel = (e: MouseEvent) => {
		const canvas = e.target as HTMLCanvasElement;
		const { left, top, width } = canvas.getBoundingClientRect();
		const [mouseX, mouseY] = [e.clientX - left, e.clientY - top];
		const segmentSize = width / segments;
		const x = Math.floor(mouseX / segmentSize);
		const y = Math.floor(mouseY / segmentSize);
		const color = colors[y * segments + x];
		return { x, y, color };
	};

	onMount(() => {
		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					theme = (mutation.target as HTMLElement).getAttribute('data-theme') || '';
				}
			});
		});
		observer.observe(document.documentElement, { attributes: true });
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const size = canvas.clientWidth;
		[canvas.width, canvas.height] = [size * 2, size * 2];
	});

	$: if (ctx) draw(colors, gridShown, theme, currentX, currentY);

	const draw = (
		colors: number[],
		gridShown: boolean,
		theme: string,
		currentX: number,
		currentY: number
	) => {
		ctx.strokeStyle = variants[theme === 'catppuccin-latte' ? 'latte' : 'mocha'].text.hex;
		const size = canvas.width;
		const segmentSize = size / segments;
		ctx.clearRect(0, 0, segments * segmentSize, segments * segmentSize);
		for (let y = 0; y < segments; y++) {
			for (let x = 0; x < segments; x++) {
				const color = colors[segments * y + x];
				if (color !== -1) {
					ctx.fillStyle = palette[color];
					ctx.fillRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
				}
				if (gridShown) {
					ctx.lineWidth = 1;
					console.log(currentX, currentY);
					if (currentX === x && currentY === y && pixelSelection) {
						ctx.lineWidth = 7;
					}
					ctx.strokeRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
				}
			}
		}
	};
</script>

<canvas
	bind:this={canvas}
	class={$$props.class}
	on:click
	on:mousemove={(e) => {
		const pixel = getPixel(e);
		currentX = pixel.x;
		currentY = pixel.y;
		dispatch('mousemove', e);
	}}
	on:mousedown
	on:mouseup
	on:focus
	on:mouseover
	on:blur
	on:mouseout={(e) => {
		currentX = -1;
		currentY = -1;
		dispatch('mouseout', e);
	}}
/>
