<script>
	import GithubIcon from '~icons/ri/github-fill';
	import TelegramIcon from '~icons/ri/telegram-fill';
	const developers = [
		{
			name: 'nicejji',
			desc: 'Author of this website :)',
			github: 'https://github.com/nicejji',
			telegram: 'https://t.me/wkiskas',
			role: 'Maintainer'
		}
	];
</script>

<div class="flex flex-col items-center gap-3 p-3 h-full w-full">
	<span class="text-2xl font-bold">Developers</span>

	{#each developers as dev}
		<div class="w-full bg-base-200 flex flex-col p-3 rounded-lg gap-2">
			<div class="flex flex-row items-center gap-3">
				<span class="text-xl font-bold">{dev.name}</span>
				<div class="badge badge-success">{dev.role}</div>
			</div>
			<span>{dev.desc}</span>
			<div class="flex flex-row items-center gap-3">
				<span>links:</span>
				<a rel="noreferrer" target="_blank" class="btn-info rounded-full" href={dev.github}>
					<GithubIcon class="text-3xl" />
				</a>
				<a rel="noreferrer" target="_blank" class="btn-info rounded-full" href={dev.telegram}>
					<TelegramIcon class="text-3xl" />
				</a>
			</div>
		</div>
	{/each}
</div>
