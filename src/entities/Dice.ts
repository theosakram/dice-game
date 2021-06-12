export class Dice {
	#value: number = 1;

	public getValue(): number {
		return this.#value;
	}

	public setValue(val: number): void {
		this.#value = val;
	}
}
