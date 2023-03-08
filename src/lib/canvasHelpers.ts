import { variants } from '@catppuccin/palette';

export const getCoord = (e: MouseEvent | TouchEvent, cols: number, rows: number) => {
	const canvas = e.target as HTMLCanvasElement;
	const { left, top, width, height } = canvas.getBoundingClientRect();
	let posX, posY;
	if (e instanceof MouseEvent) {
		[posX, posY] = [e.clientX - left, e.clientY - top];
	} else {
		[posX, posY] = [e.touches[0].clientX - left, e.touches[0].clientY - top];
	}
	const x = Math.floor(posX / (width / cols));
	const y = Math.floor(posY / (height / rows));
	return { x, y };
};

const fitCanvas = (canvas: HTMLCanvasElement, render: Function) => {
	[canvas.width, canvas.height] = [canvas.clientWidth * 2, canvas.clientHeight * 2];
	render();
};

export const autoResize = (canvas: HTMLCanvasElement, render: Function) => {
	fitCanvas(canvas, render);
	let lastResized = false;
	addEventListener('resize', () => {
		if (!lastResized) {
			fitCanvas(canvas, render);
			lastResized = true;
			setTimeout(() => {
				lastResized = false;
				fitCanvas(canvas, render);
			}, 300);
		}
	});
};

export const mochaPalette: string[] = Object.entries(variants.mocha).map(([_, v]) => v.hex);
const choice = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
export const randomPixels = () => {
	const color_set = Array.from({ length: 3 }, (_) => choice(mochaPalette));
	return Array.from({ length: 16 }, (_) => Array.from({ length: 16 }, (_) => choice(color_set)));
};
