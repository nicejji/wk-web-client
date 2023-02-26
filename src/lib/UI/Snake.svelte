<script lang="ts">
	import AvatarView from '$lib/UI/AvatarView.svelte';
	import { Game, type ColorConfig, type Move } from '$lib/UI/logic';

	export let width = 16;
	export let height = 16;
	export let fps = 20;
	export let colors: ColorConfig;

	let game = new Game(width, height, colors);
	let move: Move = 'DOWN';

	const keys = {
		ArrowLeft: 'LEFT',
		ArrowRight: 'RIGHT',
		ArrowDown: 'DOWN',
		ArrowUp: 'UP'
	} as const;

	const onKeyDown = (e: KeyboardEvent) => {
		move = keys[e.key as keyof typeof keys] || move;
	};

	let field = Array.from({ length: height }, (_) => Array(width).fill(3));

	const interval = setInterval(() => {
		try {
			game.tick(move);
			field = game.field;
		} catch (err) {
			clearInterval(interval);
		}
	}, 1000 / fps);
</script>

<AvatarView pixels={field} class={$$props.class} />
<svelte:window on:keydown|preventDefault={onKeyDown} />
