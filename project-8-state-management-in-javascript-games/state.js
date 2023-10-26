import { InputEnum } from "./input.js";

export const StateEnum = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  SITTING_LEFT: 2,
  SITTING_RIGHT: 3,
  RUNNING_LEFT: 4,
  RUNNING_RIGHT: 5,
  JUMPING_LEFT: 6,
  JUMPING_RIGHT: 7,
  FALLING_LEFT: 8,
  FALLING_RIGHT: 9,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super("STANDING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 1;
    this.player.maxFrame = 6;
    this.player.speed = 0;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_RIGHT) {
      this.player.setState(StateEnum.RUNNING_RIGHT);
    } else if (input === InputEnum.PRESS_LEFT) {
      this.player.setState(StateEnum.RUNNING_LEFT);
    } else if (input === InputEnum.PRESS_DOWN) {
      this.player.setState(StateEnum.SITTING_LEFT);
    } else if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.JUMPING_LEFT);
    }
  }
}

export class StandingRight extends State {
  constructor(player) {
    super("STANDING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 0;
    this.player.maxFrame = 6;
    this.player.speed = 0;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_RIGHT) {
      this.player.setState(StateEnum.RUNNING_RIGHT);
    } else if (input === InputEnum.PRESS_LEFT) {
      this.player.setState(StateEnum.RUNNING_LEFT);
    } else if (input === InputEnum.PRESS_DOWN) {
      this.player.setState(StateEnum.SITTING_RIGHT);
    } else if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.JUMPING_RIGHT);
    }
  }
}

export class SittingLeft extends State {
  constructor(player) {
    super("SITTING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 9;
    this.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_RIGHT) {
      this.player.setState(StateEnum.SITTING_RIGHT);
    } else if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.STANDING_LEFT);
    }
  }
}

export class SittingRight extends State {
  constructor(player) {
    super("SITTING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 8;
    this.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_LEFT) {
      this.player.setState(StateEnum.SITTING_LEFT);
    } else if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.STANDING_RIGHT);
    }
  }
}

export class RunningLeft extends State {
  constructor(player) {
    super("RUNNING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 7;
    this.player.maxFrame = 8;
    this.player.speed = -this.player.maxSpeed;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_RIGHT) {
      this.player.setState(StateEnum.RUNNING_RIGHT);
    } else if (input === InputEnum.RELEASE_LEFT) {
      this.player.setState(StateEnum.STANDING_LEFT);
    }
    if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.JUMPING_LEFT);
    }
  }
}

export class RunningRight extends State {
  constructor(player) {
    super("RUNNING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 6;
    this.player.maxFrame = 8;
    this.player.speed = this.player.maxSpeed;
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_LEFT) {
      this.player.setState(StateEnum.RUNNING_LEFT);
    } else if (input === InputEnum.RELEASE_RIGHT) {
      this.player.setState(StateEnum.STANDING_RIGHT);
    } else if (input === InputEnum.PRESS_UP) {
      this.player.setState(StateEnum.JUMPING_RIGHT);
    }
  }
}

class Jumping extends State {
  constructor(state) {
    super(state)
    this.jumpPower = 7;
  }
}

export class JumpingLeft extends Jumping {
  constructor(player) {
    super("JUMPING LEFT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
    this.player.maxFrame = 6;
    if (this.player.onGround()) {
      this.player.vy -= this.jumpPower;
    }
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_LEFT) {
      this.player.speed = -this.player.maxSpeed * 0.5;
    } else if (input === InputEnum.PRESS_RIGHT) {
      this.player.setState(StateEnum.JUMPING_RIGHT);
    } else if (this.player.vy > 0) {
      this.player.setState(StateEnum.FALLING_LEFT);
    }
  }
}

export class JumpingRight extends Jumping {
  constructor(player) {
    super("JUMPING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 2;
    this.player.maxFrame = 6;
    if (this.player.onGround()) {
      this.player.vy -= this.jumpPower;
    }
  }

  handleInput(input) {
    if (input === InputEnum.PRESS_RIGHT) {
      this.player.speed = this.player.maxSpeed * 0.5;
    } else if (input === InputEnum.PRESS_LEFT) {
      this.player.setState(StateEnum.JUMPING_LEFT);
    } else if (this.player.vy > 0) {
      this.player.setState(StateEnum.FALLING_RIGHT);
    }
  }
}

export class FallingLeft extends State {
  constructor(player) {
    super("FALLING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 5;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(StateEnum.STANDING_LEFT);
    }
  }
}

export class FallingRight extends State {
  constructor(player) {
    super("FALLING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameY = 4;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(StateEnum.STANDING_RIGHT);
    }
  }
}
