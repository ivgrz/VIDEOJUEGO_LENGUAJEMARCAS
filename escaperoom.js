const character = document.getElementById("character");
let posX = 0;
let posY = 0;
const step = 40; // tamaño del paso (igual al tamaño del personaje)

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (posY > 0) posY -= step;
      break;
    case "ArrowDown":
    case "s":
      if (posY < 360) posY += step;
      break;
    case "ArrowLeft":
    case "a":
      if (posX > 0) posX -= step;
      break;
    case "ArrowRight":
    case "d":
      if (posX < 360) posX += step;
      break;
  }
  updateCharacterPosition();
});

function updateCharacterPosition() {
  character.style.top = posY + "px";
  character.style.left = posX + "px";
}
