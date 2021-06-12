import { Dice } from "./Dice";

export class Player {
	#id: number;
	#name: string;
	#dices: Dice[] = [];
	#score: number = 0;
	#canPlay: boolean = true;

	constructor(id: number, name: string, numberOfDice: number) {
		this.#id = id;
		this.#name = name;
		this.initDice(numberOfDice);
	}

	private initDice(n: number): void {
		let i = n;

		while (i > 0) {
			this.#dices.push(new Dice());
			i--;
		}
	}

	public addDice() {
		this.#dices.push(new Dice());
	}

	private incrementScore(score: number) {
		this.#score += score;
	}

	public getScore() {
		return this.#score;
	}

	public removeDice(num: number) {
		const newDices = this.#dices.filter((dice) => dice.getValue() !== num);
		const scoredDices = this.#dices.filter(
			(dice) => dice.getValue() === num
		);
		this.#dices = newDices;

		if (num === 6) {
			this.incrementScore(scoredDices.length);
		}
	}

	public throwDice() {
		this.#dices.forEach((dice) =>
			dice.setValue(Math.ceil(Math.random() * 6))
		);
	}

	public selfEvaluation() {
		return [
			this.getDice().filter((dice) => dice === 6).length,
			this.getDice().filter((dice) => dice === 1).length,
		];
	}

	public getId(): number {
		return this.#id;
	}

	public getName(): string {
		return this.#name;
	}

	public getDice(): number[] {
		return this.#dices.map((dice) => dice.getValue());
	}

	public getDiceAmount() {
		return this.#dices.length;
	}

	public elligibleToPlay() {
		return this.#canPlay;
	}

	public removeFromGame() {
		this.#canPlay = false;
	}
}
