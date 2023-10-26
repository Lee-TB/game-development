import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

window.addEventListener("load", function () {
  const loading = this.document.getElementById("loading");
  loading.style.display = "none";
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();
  let lastTimeStamp = 0;

  function animate(timeStamp = 0) {
    const deltaTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStatusText(ctx, input, player); 

    player.update(input.lastKey, deltaTime);
    player.draw(ctx);

    requestAnimationFrame(animate);
  }
  animate();
});
