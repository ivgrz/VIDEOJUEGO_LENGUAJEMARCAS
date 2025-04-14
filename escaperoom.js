document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const gameScreen = document.getElementById("gameScreen");
    let posX = 0;
    let posY = 0;
    const step = 40;

    let gameWidth = 0;
    let gameHeight = 0;
    let characterWidth = 0;
    let characterHeight = 0;

    // Función para recalcular dimensiones
    function recalculateDimensions() {
        gameWidth = gameScreen.offsetWidth;
        gameHeight = gameScreen.offsetHeight;
        characterWidth = character.offsetWidth;
        characterHeight = character.offsetHeight;
    }

    // Recalcular dimensiones al cargar el juego
    recalculateDimensions();

    // Posicionar al personaje en el centro del contenedor
    posX = (gameWidth - characterWidth) / 2;
    posY = (gameHeight - characterHeight) / 2;
    updateCharacterPosition();

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (posY > 0) posY -= step;
                character.style.backgroundImage = "url('Imagenes/blackie_arriba.png')";
                break;
            case "ArrowDown":
            case "s":
                if (posY + characterHeight < gameHeight) posY += step;
                character.style.backgroundImage = "url('Imagenes/blackie_abajo.png')";
                break;
            case "ArrowLeft":
            case "a":
                if (posX > 0) posX -= step;
                character.style.backgroundImage = "url('Imagenes/blackie_izquierda.png')";
                break;
            case "ArrowRight":
            case "d":
                if (posX + characterWidth < gameWidth) posX += step;
                character.style.backgroundImage = "url('Imagenes/blackie_derecha.png')";
                break;
        }
        updateCharacterPosition();
    });

    function updateCharacterPosition() {
        character.style.top = posY + "px";
        character.style.left = posX + "px";
    }
});