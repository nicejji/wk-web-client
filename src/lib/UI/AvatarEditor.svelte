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

	import AvatarView from './AvatarView.svelte';

	export let colors_data: string;

	const dispatch = createEventDispatcher();
	const palette = Object.entries(variants.mocha).map(([_, v]) => v.hex);

	let colors = JSON.parse(colors_data);
	$: segments = colors.length ** 0.5;
	let buffer: number[][] = [];
	let selectedColor = 0;
	let tool: 'draw' | 'fill' | 'pick' | 'erase' = 'draw';
	let mouseHold = false;
	let gridShown = true;

	interface Pixel {
		x: number;
		y: number;
		color: number;
	}

	type toolFunc = {
		(pixel: Pixel): void;
	};

	const save = () => {
		dispatch('save', JSON.stringify(colors));
	};

	const reset = () => {
		if (buffer.length < 1000) buffer.push([...colors]);
		colors = JSON.parse(colors_data);
	};

	const back = () => {
		if (buffer.length) colors = buffer.pop();
	};

	const getPixel = (e: MouseEvent): Pixel => {
		const canvas = e.target as HTMLCanvasElement;
		const { left, top, width } = canvas.getBoundingClientRect();
		const [mouseX, mouseY] = [e.clientX - left, e.clientY - top];
		const segmentSize = width / segments;
		const x = Math.floor(mouseX / segmentSize);
		const y = Math.floor(mouseY / segmentSize);
		const color = colors[y * segments + x];
		return { x, y, color };
	};

	const draw: toolFunc = ({ x, y }) => {
		colors[y * segments + x] = selectedColor;
	};

	const erase: toolFunc = ({ x, y }) => {
		colors[y * segments + x] = -1;
	};

	const fill: toolFunc = ({ x, y, color }) => {
		if (x < 0 || x >= segments || y < 0 || y >= segments) return;
		const currentColor = colors[y * segments + x];
		if (currentColor !== color || currentColor === selectedColor) return;
		if (currentColor === color) colors[y * segments + x] = selectedColor;
		[-1, 0, 1]
			.map((xInc, _, increments) => increments.map((yInc) => [xInc, yInc]))
			.flat()
			.filter(([xInc, yInc]) => xInc || yInc)
			.forEach(([xInc, yInc]) => fill({ x: x + xInc, y: y + yInc, color }));
	};

	const pick: toolFunc = ({ color }) => {
		selectedColor = color !== -1 ? color : selectedColor;
	};

	const tools = { draw, fill, pick, erase };

	const handleTool = (e: MouseEvent, once: boolean) => {
		if (!mouseHold && !once) return;
		const prevState = [...colors];
		const pixel = getPixel(e);
		tools[tool](pixel);
		if (JSON.stringify(prevState) !== JSON.stringify(colors) && buffer.length < 1000)
			buffer.push(prevState);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === 'u') {
			back();
			return;
		}
		if (key === 'r') {
			reset();
			return;
		}
		if (key === 'v') {
			gridShown = !gridShown;
		}
		const keys = {
			b: 'draw',
			g: 'fill',
			i: 'pick',
			e: 'erase'
		};
		const newTool = keys[key];
		if (newTool) tool = newTool;
	};
</script>

<div class="w-80 flex flex-col gap-3 items-center">
	<AvatarView
		class="w-full cursor-crosshair"
		{colors}
		{gridShown}
		pixelSelection={true}
		on:click={(e) => handleTool(e, true)}
		on:mousemove={(e) => handleTool(e.detail, false)}
		on:mousedown={() => (mouseHold = true)}
		on:mouseup={() => (mouseHold = false)}
	/>

	<div class="w-full">
		<div class="h-3 rounded-t-lg self-stretch" style={`background: ${palette[selectedColor]}`} />

		<div class="grid w-full grid-cols-11 py-3 bg-base-300 gap-1 p-1 rounded-b-lg">
			{#each palette as color, i}
				<button
					on:click={() => (selectedColor = i)}
					class="w-5 h-5 rounded-md"
					style={`background: ${color}`}
				/>
			{/each}
		</div>
	</div>

	<div class="flex flex-row gap-3">
		<div class="flex flex-col gap-1">
			<div class="btn-group">
				<button
					class="btn btn-sm"
					on:click={() => (gridShown = !gridShown)}
					class:btn-outline={gridShown}><GridIcon /></button
				>
				<button class="btn btn-sm btn-error" on:click={reset}><ResetIcon /></button>
				<button class="btn btn-sm" on:click={back}><BackIcon /></button>
			</div>
			<div class="flex flex-row justify-between px-2">
				<kbd class="kbd kbd-sm">v</kbd>
				<kbd class="kbd kbd-sm">r</kbd>
				<kbd class="kbd kbd-sm">u</kbd>
			</div>
		</div>
		<div class="flex flex-col gap-1">
			<div class="btn-group">
				<button
					class="btn btn-sm"
					on:click={() => (tool = 'draw')}
					class:btn-active={tool === 'draw'}
				>
					<BrushIcon />
				</button>
				<button
					class="btn btn-sm"
					on:click={() => (tool = 'fill')}
					class:btn-active={tool === 'fill'}
				>
					<BucketIcon />
				</button>
				<button
					class="btn btn-sm"
					on:click={() => (tool = 'pick')}
					class:btn-active={tool === 'pick'}
				>
					<PickIcon />
				</button>
				<button
					class="btn btn-sm"
					on:click={() => (tool = 'erase')}
					class:btn-active={tool === 'erase'}
				>
					<EraseIcon />
				</button>
			</div>
			<div class="flex w-full justify-between px-2">
				<kbd class="kbd kbd-sm">b</kbd>
				<kbd class="kbd kbd-sm">g</kbd>
				<kbd class="kbd kbd-sm">i</kbd>
				<kbd class="kbd kbd-sm">e</kbd>
			</div>
		</div>
	</div>
	<button class="btn btn-success btn-sm btn-wide" on:click={save}>save</button>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />
