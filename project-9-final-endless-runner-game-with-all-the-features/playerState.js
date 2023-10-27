export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};

class State {
  constructor(player) {
    this.player = player;
  }
}

export class Sitting extends State {
  constructor(player) {
    super(player);
  }

  enter() {
    this.player.frameY = 5;
    this.player.maxFrame = 4;
    this.player.game.speed = 0;
  }

  handleInput(input) {
    if (input.keys.includes("ArrowLeft") || input.keys.includes("ArrowRight")) {
      this.player.setState(states.RUNNING);
    } else if (input.keys.includes("ArrowUp")) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super(player);
  }

  enter() {
    this.player.frameY = 3;
    this.player.maxFrame = 8;
    this.player.game.speed = 3;
  }

  handleInput(input) {
    if (input.keys.includes("ArrowDown") && input.keys.length === 1) {
      this.player.setState(states.SITTING);
    } else if (input.keys.includes("ArrowUp")) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super(player);
  }

  enter() {
    this.player.frameY = 1;
    this.player.maxFrame = 6;
    if (this.player.onGround()) {
      this.player.vy = -10;      
    }
  }

  handleInput(input) {
    if (this.player.vy > 0) {
      this.player.setState(states.FALLING);      
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super(player);
  }

  enter() {
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.SITTING);
    }
  }
}
