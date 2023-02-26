<script>
	import '../app.css';
	import IconGame from '~icons/ri/gamepad-fill';
	import IconFeed from '~icons/ri/newspaper-fill';
	import IconChat from '~icons/ri/message-3-fill';
	import IconUser from '~icons/ri/user-3-fill';
	import IconSearch from '~icons/ri/search-line';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<div on:dblclick|preventDefault class="h-full flex flex-col justify-between">
	<div class="py-2 px-7 bg-base-200 text-2xl flex justify-between gap-4 w-full">
		<span>wkiskas</span>
	</div>

	<div class="flex flex-col h-full overflow-scroll">
		<slot />
	</div>

	<footer class="py-2 px-7 bg-base-200 text-2xl flex justify-between gap-4 w-full">
		<IconUser />
		<IconFeed />
		<IconChat />
		<IconGame />
		<IconSearch />
	</footer>
</div>
