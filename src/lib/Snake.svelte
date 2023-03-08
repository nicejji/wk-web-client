<script lang="ts">
	import chroma from 'chroma-js';

	import IconArrowDown from '~icons/ri/arrow-down-fill';
	import IconArrowUp from '~icons/ri/arrow-up-fill';
	import IconArrowLeft from '~icons/ri/arrow-left-fill';
	import IconArrowRight from '~icons/ri/arrow-right-fill';
	import PixelView from '$lib/PixelView.svelte';
	import { variants } from '@catppuccin/palette';
	import { Game, type Config, directions } from '$lib/snakeGame';

	export let config: Config = {
		width: 16,
		height: 16,
		stones: 0
	};

	let getField = () =>
		Array.from({ length: config.height }, (_) => Array(config.width).fill(variants.mocha.base.hex));

	let game: Game;
	let field: string[][] = getField();
	let move: keyof typeof directions;
	let gameStarted = false;
	let fps = 10;

	const startGame = () => {
		gameStarted = true;
		game = new Game(config);
		field = getField();
		move = 'down';
		const interval = setInterval(() => {
			try {
				field = getField();
				const { snake, apple, stones } = game.tick(move);
				const gradient = chroma
					.scale([variants.mocha.red.hex, variants.mocha.green.hex])
					.colors(snake.length);
				snake.forEach(({ x, y }, i) => (field[y][x] = gradient[i]));
				stones.forEach(({ x, y }) => (field[y][x] = variants.mocha.text.hex));
				field[apple.y][apple.x] = variants.mocha.red.hex;
			} catch (err) {
				gameStarted = false;
				clearInterval(interval);
			}
		}, 1000 / fps);
	};
</script>

<div class="flex flex-col items-center gap-5">
	{#if gameStarted}
		<PixelView pixels={field} class={$$props.class} style={$$props.style} />
	{:else}
		<div class={$$props.class + ' flex flex-col justify-center items-center gap-5'}>
			<span class="text-warning font-bold"
				>{game ? 'Snake length: ' + (game.snake.length - 1) : ''}</span
			>
			<div class="input-group justify-center">
				<button class="btn" on:click={() => fps--}>-</button>
				<span>{fps} FPS</span>
				<button class="btn" on:click={() => fps++}>+</button>
			</div>
			<button class="btn btn-success" on:click={startGame}>Restart</button>
		</div>
	{/if}

	<div>
		<div class="flex justify-center w-full">
			<button class="btn btn-lg" on:click={() => (move = 'up')}><IconArrowUp /></button>
		</div>
		<div class="flex justify-center gap-20 w-full">
			<button class="btn btn-lg" on:click={() => (move = 'left')}><IconArrowLeft /></button>
			<button class="btn btn-lg" on:click={() => (move = 'right')}><IconArrowRight /></button>
		</div>
		<div class="flex justify-center w-full">
			<button class="btn btn-lg" on:click={() => (move = 'down')}><IconArrowDown /></button>
		</div>
	</div>
</div>
