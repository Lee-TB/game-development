class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markForDeletion = false;
    this.speedX = 0;
    this.speedY = 0;
  }

  update(deltaTime) {
    // Movement
    this.x -= this.speedX * this.game.speed;
    this.y += this.speedY * this.game.speed;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;

    // Off screen enemy deletion
    if (this.x < -this.width) this.markForDeletion = true;
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
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
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super(game);    
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + (Math.random() * this.game.width) / 2;
    this.y = (Math.random() * this.game.height) / 2;
    this.speedX = Math.random() + 0.5;
    this.speedY = 0;
    this.image = document.getElementById("enemy_fly");
    this.maxFrame = 5;
    this.angle = 0;
    this.va = 0.1 + Math.random() * 0.1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }

  draw(context) {
    super.draw(context);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super(game);    
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("enemy_plant");
    this.maxFrame = 1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.x -= this.game.speed * 0.5;
  }

  draw(context) {
    super.draw(context);
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super(game);    
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = this.game.height * Math.random() * 0.5;
    this.image = document.getElementById("enemy_spider_big");
    this.maxFrame = 5;
    this.speedX = 1;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y < -this.height) this.markForDeletion = true;
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 3);
    context.stroke();
  }
}
