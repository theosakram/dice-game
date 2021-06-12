import { Player } from "./Player";

export class Game {
	#players: Player[];
	#state: number = 1;
	constructor(newPlayers: string[], num: number) {
		this.#players = this.initPlayer(newPlayers, num);
	}

	private initPlayer(players: string[], num: number) {
		let newPlayers = [];

		for (let i = 0; i < players.length; i++) {
			newPlayers.push(new Player(i + 1, players[i], num));
		}

		return newPlayers;
	}

	private logPlayerDice(players: Player[]) {
		players.forEach((player) =>
			console.log(
				` Pemain #${player.getId()} (${player.getName()}) (Skor: ${player.getScore()}}): ${player.getDice()}`
			)
		);
	}

	private logDiceThrow() {
		console.log(`Putaran ke ${this.getState()}`);
		console.log("============");

		this.#players.forEach((player) => {
			if (player.elligibleToPlay()) {
				player.throwDice();
			}
		});

		this.logPlayerDice(this.#players);
	}

	private evaluation() {
		const evalArr = this.#players.map((player) => player.selfEvaluation());

		for (let i = 0; i < evalArr.length; i++) {
			if (evalArr[i][0]) {
				this.#players[i].removeDice(6);
			}

			if (evalArr[i][1]) {
				const nextPlayerThatCanPlay = this.#players.filter(
					(player) =>
						player.getId() > this.#players[i].getId() &&
						player.elligibleToPlay()
				)[0];
				const firstPlayerThatCanPlay = this.#players.filter(
					(player) =>
						player.getId() < this.#players[i].getId() &&
						player.elligibleToPlay()
				)[0];

				if (nextPlayerThatCanPlay) {
					this.#players[i].removeDice(1);
					nextPlayerThatCanPlay.addDice();
				} else {
					this.#players[i].removeDice(1);
					firstPlayerThatCanPlay.addDice();
				}
			}
		}

		this.logPlayerDice(this.#players);
	}

	private logEvaluation() {
		console.log("Setelah evaluasi");
		this.evaluation();
	}

	private playerDiceState() {
		for (let i = 0; i < this.#players.length; i++) {
			if (!this.#players[i].getDice().length) {
				this.#players[i].removeFromGame();
			}
		}
	}

	private getState(): number {
		return this.#state;
	}

	private winningCondition() {
		return (
			this.#players.filter((player) => player.elligibleToPlay())
				.length === 1
		);
	}

	private logWinner() {
		const score = this.#players.map((player) => player.getScore());
		const highestScore = Math.max(...score);
		const winners = this.#players
			.filter((player) => player.getScore() === highestScore)
			.map((p) => p.getName());

		console.log(
			`Pemenangnya adalah ${winners.join(
				", "
			)} dengan skor: ${highestScore}`
		);
	}

	public play() {
		while (!this.winningCondition()) {
			this.logDiceThrow();
			this.logEvaluation();
			this.playerDiceState();
			this.#state += 1;
		}

		this.logWinner();
	}
}
