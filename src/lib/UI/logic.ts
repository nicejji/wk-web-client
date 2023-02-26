// !!!! TODO: fix bug with applw spawned on stone
type Coord = [number, number];

export type Move = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type ColorConfig = {
	apple: number;
	snakeBody: number;
	snakeHead: number;
	empty: number;
};

const createField = (width: number, height: number, empty: number) =>
	Array.from({ length: height }, (_) => Array(width).fill(empty));

const getCoordInBound = (width: number, height: number): Coord => [
	Math.floor(Math.random() * width),
	Math.floor(Math.random() * height)
];

const isCordIn = (coord: Coord, coords: Coord[]) =>
	coords.find(([x, y]) => coord[0] === x && coord[1] === y);

export class Game {
	width: number;
	height: number;
	snakeColor: number;
	headColor: number;
	appleColor: number;
	emptyColor: number;
	snake: Coord[];
	apple: Coord;
	prevMove: Move | '';
	dir: Coord;
	#field: number[][];

	constructor(width: number, height: number, colors: ColorConfig) {
		this.prevMove = '';
		this.dir = [0, 1];
		this.width = width;
		this.height = height;
		this.#field = createField(width, height, colors.empty);
		this.snake = [
			[1, 0],
			[1, 1]
		];
		this.apple = getCoordInBound(width, height);
		this.snakeColor = colors.snakeBody;
		this.headColor = colors.snakeHead;
		this.appleColor = colors.apple;
		this.emptyColor = colors.empty;
	}

	get field(): number[][] {
		const renderedField = this.#field.map((v) => [...v]);
		this.snake.forEach(
			([x, y], i) =>
				(renderedField[y][x] = i === this.snake.length - 1 ? this.headColor : this.snakeColor)
		);
		renderedField[this.apple[1]][this.apple[0]] = this.appleColor;
		return renderedField;
	}

	setDir(move: Move) {
		if (!move || move === this.prevMove) return;
		if (move === 'DOWN' && this.prevMove !== 'UP') this.dir = [0, 1];
		if (move === 'UP' && this.prevMove !== 'DOWN') this.dir = [0, -1];
		if (move === 'LEFT' && this.prevMove !== 'RIGHT') this.dir = [-1, 0];
		if (move === 'RIGHT' && this.prevMove !== 'LEFT') this.dir = [1, 0];
		this.prevMove = move;
	}

	tick(move: Move) {
		if (!this.snake.length) {
			throw new Error();
		}
		this.setDir(move);
		const newHead = this.snake
			.slice(-1)
			.map(([x, y]) => [x + this.dir[0], y + this.dir[1]])[0] as Coord;
		if (newHead[0] >= this.width || newHead[1] >= this.height || newHead[0] < 0 || newHead[1] < 0) {
			throw new Error();
		}
		if (isCordIn(newHead, this.snake.slice(0, -1))) {
			throw new Error();
		}
		this.snake.push(newHead);
		if (newHead[0] === this.apple[0] && newHead[1] === this.apple[1]) {
			this.apple = getCoordInBound(this.width, this.height);
			while (isCordIn(this.apple, this.snake)) {
				this.apple = getCoordInBound(this.width, this.height);
			}
		} else {
			this.snake.shift();
		}
	}
}
