"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
class Dice {
    constructor() {
        this.#value = 1;
    }
    #value;
    getValue() {
        return this.#value;
    }
    setValue(val) {
        this.#value = val;
    }
}
exports.Dice = Dice;
