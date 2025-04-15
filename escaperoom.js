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

    // Posicionar al personaje en el centro del contenedor
    function updateCharacterPosition() {
        character.style.top = posY + "px";
        character.style.left = posX + "px";
    }

    // Mostrar el juego y recalcular dimensiones
    document.getElementById("startButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        // Recalcular dimensiones después de mostrar el contenedor
        recalculateDimensions();

        // Posicionar al personaje en el centro del contenedor
        posX = (gameWidth - characterWidth) / 2;
        posY = (gameHeight - characterHeight) / 2;
        updateCharacterPosition();
    });

    // Manejar el movimiento del personaje
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (posY > 0) posY -= step;
                character.style.backgroundImage =  "url('Imagenes/blackie_arriba_sinfondo.png')";
                break;
            case "ArrowDown":
            case "s":
                if (posY + characterHeight < gameHeight) posY += step;
                character.style.backgroundImage = "url('Imagenes/blackie_abajo_sinfondo.png')";
                break;
            case "ArrowLeft":
            case "a":
                if (posX > 0) posX -= step;
                character.style.backgroundImage = "url('Imagenes/blackie_izquierda_sinfondo.png')";
                break;
            case "ArrowRight":
            case "d":
                if (posX + characterWidth < gameWidth) posX += step;
                character.style.backgroundImage = "url('Imagenes/blackie_derecha_sinfondo_sisirve.png')";
                break;
        }
        updateCharacterPosition();
    });
});