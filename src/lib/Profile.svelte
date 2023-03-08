<script lang="ts">
	import Avatar from './Avatar.svelte';
	import { randomPixels } from './canvasHelpers';
	export let nickname = 'Username';
	export let bio = 'Description '.repeat(10);
	export let image = JSON.stringify(randomPixels());
	export let lastSeen = 'online';
</script>

<div class="flex w-full gap-3">
	<Avatar {image} class="w-40 h-40 rounded-lg" />
	<div class="flex flex-col break-all gap-3 items-center w-full">
		<div class="flex flex-wrap items-center gap-2">
			<span class="text-2xl font-bold">{nickname}</span>
			<span class="text-xs font-light" class:text-success={lastSeen === 'online'}
				>{lastSeen + (lastSeen === 'online' ? ' ⬤' : '')}</span
			>
		</div>
		<button class="btn btn-success btn-sm">send message</button>
	</div>
</div>
<div class="divider font-bold text-xl">Bio</div>
<span class="break-all">{bio}</span>
