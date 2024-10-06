import { Const } from "../../config/const.js";
import { Fetch } from "../Fetch.js";

export class Kimetsu {
  #charactersUrl;

  constructor() {
    this.fetch = new Fetch

    this.#charactersUrl = new Map();
    this.#charactersUrl.set(Const.KIMETSU.CHARACTER_GROUP.ALL, Const.KIMETSU.API_URL.ALL);
    this.#charactersUrl.set(Const.KIMETSU.CHARACTER_GROUP.KISATSUTAI, Const.KIMETSU.API_URL.KISATSUTAI);
    this.#charactersUrl.set(Const.KIMETSU.CHARACTER_GROUP.HASHIRA, Const.KIMETSU.API_URL.HASHIRA);
    this.#charactersUrl.set(Const.KIMETSU.CHARACTER_GROUP.ONI, Const.KIMETSU.API_URL.ONI);
  }

  isValidCharacterType(characterType) {
    if (!this.#charactersUrl.has(characterType)) {
      return false;
    }

    return true;
  }

  async getCharacters(characterType) {
    const apiUrl = this.#charactersUrl.get(characterType);
    const allCharacters = await this.fetch.list_by(apiUrl);

    return allCharacters;
  }
}