<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col h-full w-full justify-center items-center gap-5">
	<span class="font-bold text-error text-xl">
		<img src="/wk_logo.svg" alt="" class="h-5 inline-flex" />
		Error
	</span>
	<span class="text-3xl font-bold">{$page.status}</span>
	<span class="text-xl">{$page.error?.message}</span>
</div>
