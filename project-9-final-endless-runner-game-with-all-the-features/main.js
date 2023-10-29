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
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 1;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.player.currentState = this.player.states[states.SITTING];
      this.player.currentState.enter();
      this.maxParticle = 100;
      this.maxEnemies = 10;
    }

    update(deltaTime) {
      this.background.update();
      this.player.update(this.input, deltaTime);

      // handle Enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else this.enemyTimer += deltaTime;

      if (this.enemies.length > this.maxEnemies) {
        this.enemies = this.enemies.slice(0, this.maxEnemies);
      }
      this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });      

      // handle Particles
      if (this.particles.length > this.maxParticle) {
        this.particles = this.particles.slice(0, this.maxParticle);
      }
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );
      this.particles.forEach((particle) => {
        particle.update(deltaTime);
      });
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
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
    requestAnimationFrame(animate);
  }
  animate();
});
