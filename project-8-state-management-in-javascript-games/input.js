export const InputEnum = {
    PRESS_LEFT: "press left",
    PRESS_RIGHT: "press right",
    PRESS_UP: "press up",
    PRESS_DOWN: "press down",
    RELEASE_LEFT: "release left",
    RELEASE_RIGHT: "release right",
    RELEASE_UP: "release up",
    RELEASE_DOWN: "release down",
}

export default class InputHandler {
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = InputEnum.PRESS_LEFT;
          break;
        case "ArrowRight":
          this.lastKey = InputEnum.PRESS_RIGHT;
          break;
        case "ArrowDown":
          this.lastKey = InputEnum.PRESS_DOWN;
          break;
        case "ArrowUp":
          this.lastKey = InputEnum.PRESS_UP;
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = InputEnum.RELEASE_LEFT;
          break;
        case "ArrowRight":
          this.lastKey = InputEnum.RELEASE_RIGHT;
          break;
        case "ArrowDown":
          this.lastKey = InputEnum.RELEASE_DOWN;
          break;
        case "ArrowUp":
          this.lastKey = InputEnum.RELEASE_UP;
          break;
      }
    });
  }
}
