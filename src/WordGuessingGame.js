import { html, css, LitElement } from 'lit';
// @feedback brings in the game board asset to be built
// this keeps the current element just about starting the game
// and passing the "word" down into the word-game-board tag
import "./wordGameBoard.js";
import '@lrnwebcomponents/simple-colors';

class WordGuessingGame extends LitElement {
  static get tag() {
    return 'word-guess-game';
  }

  constructor() {
    super();
    this.date = new Date().toISOString().slice(0, 10);
    this.endpoint = '../api/getWord';
    this.word = '';
  }

  static get properties() {
    return {
      date: { type: String, reflect: true },
      endpoint: { type: String },
      word: { type: String },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'date') {
        this.getData(this[propName]);
      }
    });
  }

  static get styles() {
    return [css`
    :host {
      display: block;
      border: 1px solid black;
      margin: 10px;
    }`];
  }
  

  async getData() {
    return fetch(`${this.endpoint}?myDay=${this.date}`)
      .then(resp => resp.json())
      .then(responseData => {
        this.word = responseData.word;
      });
  }

  render() {
    return html`date: ${this.date}. word:${this.word}
    
    <word-game-board word="${this.word}"></word-game-board>
    `;
  }
}

customElements.define(WordGuessingGame.tag, WordGuessingGame);
