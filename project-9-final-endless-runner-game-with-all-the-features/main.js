/**@type {HTMLCanvasElement} */
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";
import { states } from "./playerState.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.player.currentState = this.player.states[states.SITTING];
      this.player.currentState.enter();
      this.maxParticle = 100;
      this.maxEnemies = 20;
      this.time = 0;
      this.maxTime = 60_000;
      this.gameOver = false;
      this.lives = 5;
      this.floatingMessages = [];
      this.winningScore = 10;
    }

    update(deltaTime) {
      this.background.update();
      this.player.update(this.input, deltaTime);

      // handle Time
      if (this.time > this.maxTime) {
        this.gameOver = true;
      }
      this.time += deltaTime;

      // handle Enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        if(this.player.currentState.constructor !== this.player.states[states.SITTING]){
          this.addEnemy();
        }
      } else this.enemyTimer += deltaTime;

      if (this.enemies.length > this.maxEnemies) {
        this.enemies.length = this.maxEnemies;
      }
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      // handle messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });
      this.floatingMessages = this.floatingMessages.filter((message) => {
        if (message.markedForDeletion) this.score++;
        return !message.markedForDeletion;
      });

      // handle Particles
      if (this.particles.length > this.maxParticle) {
        this.particles.length = this.maxParticle;
      }
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.particles.forEach((particle) => {
        particle.update(deltaTime);
      });

      // handle Collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) {
          this.collisions.splice(index, 1);
        }
      });
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.UI.draw(context);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.unshift(new GroundEnemy(this));
      } else if (this.speed > 0) {
        this.enemies.unshift(new ClimbingEnemy(this));
      }
      this.enemies.unshift(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }
  animate();
});
