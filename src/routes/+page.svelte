<script lang="ts">
	import IconSvelte from '~icons/carbon/logo-svelte';
	import IconNext from '~icons/ri/arrow-right-circle-fill';
	import IconKey from '~icons/ri/key-fill';
</script>

<div class="flex flex-col items-center w-full h-full justify-center gap-10 p-5">
	<span class="text-3xl font-bold">Welcome to WK</span>
	<img src="/wk_logo.svg" class="h-16" alt="logo" />
	<span class="text-center"
		>Minimalistic full-featured real-time chat application with cool stuff.
		<a href="https://kit.svelte.dev" class="link">
			<span class="font-bold text-center"
				>Built with SvelteKit <IconSvelte class="text-red-300 inline-flex self-center" /></span
			>
		</a>
	</span>

	<div class="flex flex-col items-center gap-3">
		<a href="/signup" class="flex text-3xl text-success font-bold gap-2">
			Create account
			<IconNext />
		</a>
		<a href="/login" class="flex text-3xl text-info font-bold gap-2">
			Login
			<IconKey />
		</a>
	</div>
</div>
