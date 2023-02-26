<script lang="ts">
	import IconSend from '~icons/ri/send-plane-fill';
	import { afterUpdate } from 'svelte';

	let div: HTMLDivElement;

	afterUpdate(() => {
		if (div && messagesChanged) div.scrollTo(0, div.scrollHeight);
		messagesChanged = false;
	});

	let content = '';
	let messages = Array.from({ length: 50 }, (_) => ({
		content: 'Hello world, go',
		seen: true,
		sent: '2 hours ago',
		fromMe: false
	}));
	let messagesChanged = false;

	const sendMessage = () => {
		messages = [
			{
				content,
				seen: false,
				sent: '2 hours ago',
				fromMe: true
			},
			...messages
		];
		messagesChanged = true;
		content = '';
	};
</script>

<div class="h-full w-full bg-base-200 flex flex-col justify-between p-3 items-center">
	<div bind:this={div} class="flex overflow-scroll w-full h-full flex-col-reverse">
		{#each messages as m}
			<div class="chat chat-start" class:chat-end={!m.fromMe}>
				<div class="chat-header">
					<time class="text-xs opacity-50">{m.sent}</time>
				</div>
				<div class="chat-bubble">{m.content}</div>
				<div class="chat-footer opacity-50">{m.seen}</div>
			</div>
		{/each}
	</div>
	<div class="input-group w-full">
		<input
			bind:value={content}
			class="input w-full focus:outline-none focus:input-bordered"
			type="text"
			placeholder="Enter message"
		/>
		<button class="btn btn-success" on:click={sendMessage}>
			<IconSend />
		</button>
	</div>
</div>
