import {
  SittingLeft,
  SittingRight,
  StandingLeft,
  StandingRight,
  RunningLeft,
  RunningRight,
  JumpingLeft,
  JumpingRight,
  FallingLeft,
  FallingRight,
  StateEnum,
} from "./state.js";

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = {
      [StateEnum.STANDING_RIGHT]: new StandingRight(this),
      [StateEnum.STANDING_LEFT]: new StandingLeft(this),
      [StateEnum.SITTING_LEFT]: new SittingLeft(this),
      [StateEnum.SITTING_RIGHT]: new SittingRight(this),
      [StateEnum.RUNNING_LEFT]: new RunningLeft(this),
      [StateEnum.RUNNING_RIGHT]: new RunningRight(this),
      [StateEnum.JUMPING_LEFT]: new JumpingLeft(this),
      [StateEnum.JUMPING_RIGHT]: new JumpingRight(this),
      [StateEnum.FALLING_LEFT]: new FallingLeft(this),
      [StateEnum.FALLING_RIGHT]: new FallingRight(this),
    };
    this.currentState = this.states[StateEnum.STANDING_LEFT];
    this.image = dogImage;
    this.width = 200;
    this.height = 181.83;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    this.vy = 0;
    this.weight = 0.1;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.currentState.enter();
    this.speed = 0;
    this.maxSpeed = 5;
    this.fps = 30;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(inputKey, deltaTime) {
    this.currentState.handleInput(inputKey);

    // Sprite animation    
    if(this.frameTimer > this.frameInterval){
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;

    // Horizontal movement
    this.x += this.speed;

    // Horizontal boundaries
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
      this.y = this.gameHeight - this.height;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
