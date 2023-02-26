<script lang="ts">
	import SvelteIcon from '~icons/carbon/logo-svelte';
	import NextIcon from '~icons/ri/arrow-right-circle-fill';
</script>

<div class="flex items-center flex-wrap w-full">
	<div class="flex flex-col">
		<span class="text-3xl font-bold">Welcome to</span>
		<img src="/radish.png" class="h-56" alt="logo" />
		<p>Minimalistic full-featured real-time chat application.</p>
		<a href="https://kit.svelte.dev" class="flex items-center gap-2">
			<span class="font-bold">Built with SvelteKit: </span>
			<SvelteIcon class="text-red-300 text-2xl" />
		</a>
	</div>

	<div class="flex flex-row flex-1 justify-center">
		<a href="/login" class="flex text-3xl text-success font-bold gap-2">
			Get started
			<NextIcon />
		</a>
	</div>
</div>
