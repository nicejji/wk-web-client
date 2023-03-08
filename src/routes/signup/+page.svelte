<script lang="ts">
	import KeyIcon from '~icons/ri/key-fill';

	let fields = [
		{
			value: '',
			type: 'text',
			placeholder: 'Nickname',
			name: 'name',
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

<form method="POST">
	<div class="flex flex-col justify-center items-center w-full h-full p-5">
		<div class="flex flex-col items-center gap-3 w-full">
			<KeyIcon class="text-2xl" />
			<div class="divider font-bold text-xl">Authorization</div>
			{#each fields as { value, type, name, error, placeholder }}
				<div
					class="tooltip-error tooltip-bottom w-full"
					data-tip={error}
					class:tooltip={value && error}
				>
					<input
						{name}
						{value}
						on:input={(e) => (value = e.target?.value)}
						{type}
						class="input w-full bg-base-300 focus:outline-none"
						class:input-error={value && error}
						{placeholder}
						class:input-success={!error}
					/>
				</div>
			{/each}
			<div class="divider" />
			<button class="btn btn-wide btn-success" class:btn-disabled={!formValid}> Log in </button>
		</div>
	</div>
</form>

<div class="modal" class:modal-open={false}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Auth error</h3>
		<p class="py-4">{''}</p>
		<div class="modal-action">
			<button class="btn" on:click={() => {}}>Try again</button>
		</div>
	</div>
</div>
