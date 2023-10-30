export const Key = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  SPACE: " ",
  SHIFT: "Shift",
  CONTROL: "Control",
};

const KeyValues = Object.values(Key);
export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1 && KeyValues.includes(e.key)) {        
        this.keys.push(e.key);
        console.log(this.keys);
      }
      if (e.key === "x") {
        this.game.debug = !this.game.debug;
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }
}
