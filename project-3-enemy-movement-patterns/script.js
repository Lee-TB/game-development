/**@type {HTMLCanvasElement} */
window.addEventListener("load", function () {
  const canvas1 = document.getElementById("canvas1");
  const ctx1 = canvas1.getContext("2d");
  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  const canvas3 = document.getElementById("canvas3");
  const ctx3 = canvas3.getContext("2d");
  const canvas4 = document.getElementById("canvas4");
  const ctx4 = canvas4.getContext("2d");

  canvas1.width = canvas2.width = canvas3.width = canvas4.width = 500;
  canvas1.height = canvas2.height = canvas3.height = canvas4.height = 1000;
  const numberOfEnemies = 30;
  let gameFrame = 0;

  const imageEnemy1 = new Image();
  imageEnemy1.src = "./enemies/enemy1.png";
  const imageEnemy2 = new Image();
  imageEnemy2.src = "./enemies/enemy2.png";
  const imageEnemy3 = new Image();
  imageEnemy3.src = "./enemies/enemy3.png";
  const imageEnemy4 = new Image();
  imageEnemy4.src = "./enemies/enemy4.png";

  class Enemy {
    constructor(canvas, image, spriteWidth, spriteHeight, spriteFrames) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.image = image;
      this.spriteWidth = spriteWidth;
      this.spriteHeight = spriteHeight;
      this.spriteFrames = spriteFrames;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = Math.random() * (this.canvas.width - this.width);
      this.y = Math.random() * (this.canvas.height - this.height);
      this.frame = 0;
    }

    draw() {
      this.ctx.drawImage(
        this.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update() {}
  }

  class Enemy1 extends Enemy {
    constructor(canvas, image, spriteWidth, spriteHeight, spriteFrames) {
      super(canvas, image, spriteWidth, spriteHeight, spriteFrames);
      this.flapSpeed = Math.floor(Math.random() * 2 + 1);
    }

    vibrate(degree) {
      this.x += Math.random() * degree - degree / 2;
      this.y += Math.random() * degree - degree / 2;
    }

    update() {
      this.vibrate(3);
      if (gameFrame % this.flapSpeed == 0) {
        this.frame++;
        this.frame = this.frame % 6;
      }
    }
  }

  class Enemy2 extends Enemy {
    constructor(canvas, image, spriteWidth, spriteHeight, spriteFrames) {
      super(canvas, image, spriteWidth, spriteHeight, spriteFrames);
      this.flapSpeed = Math.floor(Math.random() * 2 + 1);
      this.speed = Math.random() * 2 + 1;
    }

    update() {
      this.x -= this.speed;

      if (this.x < 0 - this.width) {
        this.x = this.canvas.width;
      }

      if (gameFrame % this.flapSpeed == 0) {
        this.frame++;
        this.frame = this.frame % 6;
      }
    }
  }

  class Enemy3 extends Enemy {
    constructor(canvas, image, spriteWidth, spriteHeight, spriteFrames) {
      super(canvas, image, spriteWidth, spriteHeight, spriteFrames);
      this.angle = Math.random() * 100;
      this.angleSpeed = Math.random() * 0.2 + 0.4;
      this.curve = Math.random() * 200 + 50;
    }

    update() {
      this.x =
        (this.canvas.width / 2) * Math.sin(this.angle * (Math.PI / 200)) +
        this.canvas.width / 2 -
        this.width / 2;

      this.y =
        (this.canvas.height / 2) * Math.cos(this.angle * (Math.PI / 300)) +
        this.canvas.height / 2 -
        this.height / 2;
      this.angle += this.angleSpeed;

      if (gameFrame % 5 === 0) {
        this.frame++;
        this.frame = this.frame % this.spriteFrames;
      }
    }
  }

  class Enemy4 extends Enemy {
    constructor(canvas, image, spriteWidth, spriteHeight, spriteFrames) {
      super(canvas, image, spriteWidth, spriteHeight, spriteFrames);            
      this.newX = Math.random() * (this.canvas.width - this.width);
      this.newY = Math.random() * (this.canvas.height - this.height);
      this.interval = Math.floor(Math.random() * 200 + 50);
    }

    update() {
      if (gameFrame % this.interval === 0) {
        // this.newX = Math.random() * (this.canvas.width - this.width);
        // this.newY = Math.random() * (this.canvas.height - this.height);
        this.newX =
          Math.floor(Math.random() + 0.5) * (this.canvas.width - this.width);
        this.newY =
          Math.floor(Math.random() + 0.5) * (this.canvas.height - this.height);
      }
      this.dx = this.x - this.newX;
      this.dy = this.y - this.newY;

      this.x -= this.dx / 70;
      this.y -= this.dy / 70;

      if (gameFrame % 5 === 0) {
        this.frame++;
        this.frame = this.frame % this.spriteFrames;
      }
    }
  }

  const enemiesArray1 = [];
  const enemiesArray2 = [];
  const enemiesArray3 = [];
  const enemiesArray4 = [];

  for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray1.push(new Enemy1(canvas1, imageEnemy1, 293, 155, 6));
    enemiesArray2.push(new Enemy2(canvas2, imageEnemy2, 266, 188, 6));
    enemiesArray3.push(new Enemy3(canvas3, imageEnemy3, 218, 177, 6));
  }
  for (let i = 0; i < 5; i++) {
    enemiesArray4.push(new Enemy4(canvas4, imageEnemy4, 213, 212, 9));
  }

  function animate() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx4.clearRect(0, 0, canvas3.width, canvas3.height);

    enemiesArray1.forEach((enemy) => {
      enemy.draw();
      enemy.update();
    });
    enemiesArray2.forEach((enemy) => {
      enemy.draw();
      enemy.update();
    });
    enemiesArray3.forEach((enemy) => {
      enemy.draw();
      enemy.update();
    });
    enemiesArray4.forEach((enemy) => {
      enemy.draw();
      enemy.update();
    });

    gameFrame++;
    requestAnimationFrame(animate);
  }
  animate();
  this.document.getElementById("preloader").style.display = "none";
});
