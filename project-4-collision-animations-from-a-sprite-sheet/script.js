/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
const canvasRect = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random();
    this.sound = new Audio();
    this.sound.src = "Wind effects 5.wav";
  }

  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 20 === 0) {
      this.frame++;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

canvas.addEventListener("mousedown", (e) => {
  handleMouseMove(e);
  // canvas.addEventListener("mousemove", handleMouseMove);
});

// canvas.addEventListener("mouseup", () => {
//   canvas.removeEventListener("mousemove", handleMouseMove);
// });

function handleMouseMove(e) {
  createAnimation(e);
}

function createAnimation(e) {
  const positionX = e.x - canvasRect.left;
  const positionY = e.y - canvasRect.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
