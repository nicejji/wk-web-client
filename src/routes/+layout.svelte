<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutData;

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

<div on:dblclick|preventDefault class="h-full flex flex-col justify-between bg-base-100">
	<div class="py-2 px-7 bg-base-200 text-2xl flex justify-between gap-4 w-full">
		<a href="/">
			<img src="/wk_logo.svg" alt="" class="h-5" />
		</a>
		<span class="text-xs">Logged as: {data.user.nickname}</span>
		<span class="text-xs">{$page.data.title}</span>
	</div>

	<div class="flex flex-col h-full overflow-scroll">
		<slot />
	</div>

	<footer class="py-2 px-7 bg-base-200 text-2xl flex justify-between gap-4 w-full">
		<a href="/me">
			<IconUser />
		</a>
		<IconFeed />
		<a href="/messenger">
			<IconChat />
		</a>
		<a href="/games">
			<IconGame />
		</a>
		<IconSearch />
	</footer>
</div>
