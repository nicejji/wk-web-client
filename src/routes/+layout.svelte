<script>
	import '../app.css';
	import ChatIcon from '~icons/ri/message-3-fill';
	import MoonIcon from '~icons/ri/moon-clear-fill';
	import SunIcon from '~icons/ri/sun-fill';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="navbar gap-3">
	<a href="/">
		<img src="/radish.png" class="h-7" />
	</a>
	<button class="btn btn-sm" data-set-theme="catppuccin-mocha" data-act-class="btn-outline">
		<MoonIcon />
	</button>
	<button data-set-theme="catppuccin-latte" data-act-class="btn-outline" class="btn btn-sm">
		<SunIcon />
	</button>
	<button data-set-theme="" data-act-class="btn-outline" class="btn btn-sm"> Auto </button>
</div>

<div class="flex w-full h-full">
	<slot />
</div>

<footer class="footer p-3 bg-base-200 text-base-content">
	<div class="flex flex-row w-full justify-center gap-7 text-xs">
		<a href="about">About</a>
		<a href="developers">Developers</a>
		<a href="privacy_policy">Privacy Policy</a>
		<a href="https://github.com/nicejji/minimal_chat" target="_blank" rel="noreferrer">
			Source code
		</a>
	</div>
</footer>
