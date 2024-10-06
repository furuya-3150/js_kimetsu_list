import { Kimetsu } from "./model/Kimetsu.js";
import { element } from "./view/html-util.js";
import { Const } from "../config/const.js";

export class App {
  #prevCharacterType;

  constructor(){
    this.kimetsu= new Kimetsu;
  }

  init() {
    const allCharacterTypeElement = document.querySelector('input[name="character-type"][value="1"]');
    allCharacterTypeElement.click();
  }

  mount() {
    const $characterTypes = document.querySelectorAll('input[name="character-type"]');
    const $characterListElement = document.getElementById('character-list');

    $characterTypes.forEach(($characterTypeElement) => {
      $characterTypeElement.addEventListener("click", async (event) => {

        const selectedCharacterType = parseInt(event.target.value, 10); 
        if (!selectedCharacterType || this.#prevCharacterType === selectedCharacterType) {
          return;
        }
        this.#prevCharacterType = selectedCharacterType

        if (!this.kimetsu.isValidCharacterType(selectedCharacterType)) {
          return;
        }
        
        this.showSpinner();
        const chunkedCharacters = await this.getCharacters(selectedCharacterType);

        $characterListElement.innerHTML = "";
        chunkedCharacters.forEach((characters) => {
          const $characterRowElement = element`<div class="character-row"></div>`;
          characters.forEach((character) => {
            $characterRowElement.appendChild(element`<div class=character-item><div class="character-name">名前:${character.name}</div><div class="character-image"><img src=${Const.KIMETSU.API_URL.BASE}${character.image}></div><div class="character-category">カテゴリー:${character.category}</div></div>`);
          })

          $characterListElement.appendChild($characterRowElement);
        });
        this.hideSpinner();

      })
    })
  }

  async getCharacters(characterType) {
      const characters = await this.kimetsu.getCharacters(characterType);

      // キャラクターを3列で表示するために3要素にチャンク
      let res = [];
      const chunkSize = 3;
      for (let i = 0; i < characters.length; i += chunkSize) {
        res.push(characters.slice(i, i + chunkSize));
      }

      return res ;
  }

  // スピナー表示
  showSpinner() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.loader').style.display = 'block';
  }

  // スピナー非表示
  hideSpinner() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.loader').style.display = 'none';
  }
}