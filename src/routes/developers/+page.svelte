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

<div class="flex flex-col items-center gap-3">
	<span class="text-2xl font-bold">Developers</span>

	{#each developers as dev}
		<div class="card card-compact card-side w-72 bg-base-200">
			<div class="card-body">
				<h2 class="card-title">
					{dev.name}
					<div class="badge badge-sm badge-success">{dev.role}</div>
				</h2>
				<span>{dev.desc}</span>
				<div class="card-actions justify-start items-center">
					<span>links:</span>
					<a
						rel="noreferrer"
						target="_blank"
						class="btn btn-xs btn-info rounded-full"
						href={dev.github}
					>
						<GithubIcon class="text-lg" />
					</a>
					<a
						rel="noreferrer"
						target="_blank"
						class="btn btn-xs btn-info rounded-full"
						href={dev.telegram}
					>
						<TelegramIcon class="text-lg" />
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
