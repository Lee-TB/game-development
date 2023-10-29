class Particle {
  constructor(game) {
    this.game = game;
    this.markForDeletion = false;
    this.fps = 60;
    this.timer = 0;
    this.timeInterval = 1000 / this.fps;
  }

  update(deltaTime) {
    if (this.timer > this.timeInterval) {
      this.timer = 0;
      this.x -= this.speedX + this.game.speed;
      this.y -= this.speedY;
      this.size *= 0.95;
      if (this.size <= 0.5) this.markForDeletion = true;
    } else this.timer += deltaTime;
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 5 + 5;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.1)";
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById("fire");
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.2 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
  }

  draw(context) {
    context.save();
    context.translate(
      this.x + this.game.player.width / 2,
      this.y + this.game.player.height / 2
    );
    context.rotate(this.angle * Math.floor(Math.random() - 0.5));
    context.translate(
      -(this.x + this.game.player.width / 2),
      -(this.y + this.game.player.height / 2)
    );

    context.drawImage(
      this.image,
      this.x - this.size / 2 + this.game.player.width / 2,
      this.y - this.size / 2 + this.game.player.height / 2,
      this.size,
      this.size
    );
    context.restore();
  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 20 - 10;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = -2;
    this.image = document.getElementById("fire");
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.gravity += 0.05;
    this.y += this.gravity;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
