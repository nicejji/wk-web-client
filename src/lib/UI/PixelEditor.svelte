<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { variants } from '@catppuccin/palette';

	import ResetIcon from '~icons/ri/refresh-fill';
	import BackIcon from '~icons/ri/arrow-go-back-fill';
	import EraseIcon from '~icons/ri/eraser-fill';
	import BrushIcon from '~icons/ri/brush-3-fill';
	import BucketIcon from '~icons/gg/color-bucket';
	import PickIcon from '~icons/fa6-solid/eye-dropper';
	import GridIcon from '~icons/ri/grid-line';

	import PixelView from './PixelView.svelte';

	export let pixelData: string;

	const dispatch = createEventDispatcher();

	const palette: string[] = Object.entries(variants.mocha).map(([_, v]) => v.hex);
	let pixels = JSON.parse(pixelData) as string[][];
	$: rows = pixels.length;
	$: cols = pixels[0].length;

	let selectedColor = palette[0];
	let currentTool: keyof typeof tools = 'draw';
	let mouseHold = false;
	let gridShown = true;

	const buffer: string[][][] = [];

	interface Pixel {
		x: number;
		y: number;
		color: string;
	}

	type toolFunc = {
		(pixel: Pixel): void;
	};

	const save = (prevState: string[][]) => (buffer.length < 1000 ? buffer.push(prevState) : 0);

	const dispatchExport = () => dispatch('export', JSON.stringify(pixels));

	const reset = () => {
		const prevState = pixels.map((pixel) => [...pixel]);
		save(prevState);
		pixels = JSON.parse(pixelData);
	};

	const back = () => (pixels = buffer.pop() || pixels);
	const draw: toolFunc = ({ x, y }) => (pixels[y][x] = selectedColor);
	const erase: toolFunc = ({ x, y }) => (pixels[y][x] = 'rgba(0, 0, 0, 0)');
	const pick: toolFunc = ({ color }) =>
		(selectedColor = color !== 'rgba(0, 0, 0, 0)' ? color : selectedColor);
	const fill: toolFunc = ({ x, y, color }) => {
		if (x < 0 || x >= cols || y < 0 || y >= rows) return;
		const currentColor = pixels[y][x];
		if (currentColor !== color || currentColor === selectedColor) return;
		if (currentColor === color) pixels[y][x] = selectedColor;
		[-1, 0, 1]
			.map((xInc, _, increments) => increments.map((yInc) => [xInc, yInc]))
			.flat()
			.filter(([xInc, yInc]) => xInc || yInc)
			.forEach(([xInc, yInc]) => fill({ x: x + xInc, y: y + yInc, color }));
	};

	const tools = {
		draw: { func: draw, icon: BrushIcon },
		fill: { func: fill, icon: BucketIcon },
		pick: { func: pick, icon: PickIcon },
		erase: { func: erase, icon: EraseIcon }
	};
	$: toolsKeys = Object.keys(tools) as Array<keyof typeof tools>;

	const handleTool = (pixel: Pixel, once: boolean) => {
		if (!mouseHold && !once) return;
		const prevState = pixels.map((pixel) => [...pixel]);
		tools[currentTool].func(pixel);
		if (JSON.stringify(prevState) !== JSON.stringify(pixels)) save(prevState);
	};
</script>

<div class="p-4 flex flex-col gap-2">
	<div>
		<PixelView
			class="w-full cursor-crosshair select-none aspect-square rounded-t-md"
			style={`border: 3px solid ${selectedColor}`}
			{pixels}
			{gridShown}
			on:click={(e) => handleTool(e.detail, true)}
			on:mousemove={(e) => handleTool(e.detail, false)}
			on:touchmove={(e) => {
				handleTool(e.detail, true);
			}}
			on:mousedown={() => (mouseHold = true)}
			on:mouseup={() => (mouseHold = false)}
		/>
		<div style={`background: ${selectedColor}`} class="h-3 rounded-b-md" />
	</div>

	<div class="flex flex-row flex-wrap gap-1 p-2 justify-center bg-base-200 w-full rounded-md">
		{#each palette as color}
			<button
				on:click={() => (selectedColor = color)}
				class="w-7 h-7 rounded-md shrink-0"
				style={`background: ${color}`}
			/>
		{/each}
	</div>

	<div class="btn-group w-full">
		{#each toolsKeys as t}
			<button
				class="btn btn-block shrink"
				on:click={() => (currentTool = t)}
				class:btn-active={currentTool === t}
			>
				<svelte:component this={tools[t].icon} />
			</button>
		{/each}
		<button
			class="btn btn-block shrink"
			on:click={() => (gridShown = !gridShown)}
			class:btn-outline={gridShown}><GridIcon /></button
		>
		<button class="btn btn-block shrink btn-warning" on:click={reset}><ResetIcon /></button>
		<button class="btn btn-block shrink" on:click={back}><BackIcon /></button>
	</div>
	<button class="btn btn-success" on:click={dispatchExport}>Save</button>
</div>
