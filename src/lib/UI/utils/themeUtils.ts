type ThemeCallback = (theme: string) => void;

export const onThemeChange = (callback: ThemeCallback) => {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				const theme = (mutation.target as HTMLElement).getAttribute('data-theme') || '';
				callback(theme);
			}
		});
	});
	observer.observe(document.documentElement, { attributes: true });
};
