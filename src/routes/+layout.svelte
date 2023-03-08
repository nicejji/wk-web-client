<script lang="ts">
	import { page } from '$app/stores';
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
		<span class="text-xs">Logged as: wkiskas</span>
		<span class="text-xs font-bold">{$page.url.pathname}</span>
	</div>

	<div class="flex flex-col h-full overflow-scroll p-3">
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
		<a href="/search">
			<IconSearch />
		</a>
	</footer>
</div>
