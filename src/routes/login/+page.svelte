<script lang="ts">
	import KeyIcon from '~icons/ri/key-fill';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let fields = [
		{
			value: '',
			type: 'text',
			placeholder: 'Nickname',
			name: 'nickname',
			get error() {
				return this.value.trim().length
					? this.value.trim().length < 17
						? ''
						: 'Too long nickname.'
					: "Nickname shouldn't be empty.";
			}
		},
		{
			value: '',
			type: 'password',
			placeholder: 'Token',
			name: 'password',
			get error() {
				return this.value.trim().length ? '' : "Token shouldn't be empty.";
			}
		}
	];
	$: formValid = fields.every((field) => !field.error);
</script>

<form method="POST" action="/login">
	<div class="flex flex-col w-96 gap-3 p-10 items-center">
		<KeyIcon class="text-2xl" />
		<div class="divider font-bold text-xl">Authorization</div>
		{#each fields as { value, type, name, error, placeholder }}
			<div class="tooltip-error tooltip-bottom" data-tip={error} class:tooltip={value && error}>
				<input
					{name}
					{value}
					on:input={(e) => (value = e.target.value)}
					{type}
					class="input bg-base-300 focus:outline-none"
					class:input-error={value && error}
					{placeholder}
					class:input-success={!error}
				/>
			</div>
		{/each}
		<div class="divider" />
		<button class="btn btn-wide btn-success" class:btn-disabled={!formValid}> Log in </button>
	</div>
</form>

<div class="modal" class:modal-open={form?.errorMessage}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Auth error</h3>
		<p class="py-4">{form?.errorMessage}</p>
		<div class="modal-action">
			<button class="btn" on:click={() => {}}>Try again</button>
		</div>
	</div>
</div>
