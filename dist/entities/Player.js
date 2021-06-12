"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Dice_1 = require("./Dice");
class Player {
    constructor(id, name, numberOfDice) {
        this.#dices = [];
        this.#score = 0;
        this.#canPlay = true;
        this.#id = id;
        this.#name = name;
        this.initDice(numberOfDice);
    }
    #id;
    #name;
    #dices;
    #score;
    #canPlay;
    initDice(n) {
        let i = n;
        while (i > 0) {
            this.#dices.push(new Dice_1.Dice());
            i--;
        }
    }
    addDice() {
        this.#dices.push(new Dice_1.Dice());
    }
    incrementScore(score) {
        this.#score += score;
    }
    getScore() {
        return this.#score;
    }
    removeDice(num) {
        const newDices = this.#dices.filter((dice) => dice.getValue() !== num);
        const scoredDices = this.#dices.filter((dice) => dice.getValue() === num);
        this.#dices = newDices;
        if (num === 6) {
            this.incrementScore(scoredDices.length);
        }
    }
    throwDice() {
        this.#dices.forEach((dice) => dice.setValue(Math.ceil(Math.random() * 6)));
    }
    selfEvaluation() {
        return [
            this.getDice().filter((dice) => dice === 6).length,
            this.getDice().filter((dice) => dice === 1).length,
        ];
    }
    getId() {
        return this.#id;
    }
    getName() {
        return this.#name;
    }
    getDice() {
        return this.#dices.map((dice) => dice.getValue());
    }
    getDiceAmount() {
        return this.#dices.length;
    }
    elligibleToPlay() {
        return this.#canPlay;
    }
    removeFromGame() {
        this.#canPlay = false;
    }
}
exports.Player = Player;
