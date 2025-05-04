document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const gameScreen = document.getElementById("gameScreen");

    let posX = 0;
    let posY = 0;
    const step = 20;
    let currentCollision = null; // Almacena el objeto con el que se está colisionando

    // Lista de objetos con los que se puede colisionar
    const obstacles = Array.from(document.querySelectorAll(".obstacle"));

    document.getElementById("startButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none";
        gameScreen.style.display = "block";

        // Posicionar el personaje en la parte baja derecha
        posX = gameScreen.offsetWidth - character.offsetWidth - 10; // 10px de margen
        posY = gameScreen.offsetHeight - character.offsetHeight - 10; // 10px de margen
        updateCharacterPosition();
    });

    function updateCharacterPosition() {
        character.style.top = posY + "px";
        character.style.left = posX + "px";
        console.log(`Posición actualizada: (${posX}, ${posY})`);
    }

    function checkCollision() {
        const characterRect = character.getBoundingClientRect();
        console.log("Character Rect:", characterRect);
        currentCollision = null; // Reinicia la colisión actual

        for (const obstacle of obstacles) {
            const obstacleRect = obstacle.getBoundingClientRect();
            console.log(`Obstacle (${obstacle.id}) Rect:`, obstacleRect);

            if (
                characterRect.left < obstacleRect.right &&
                characterRect.right > obstacleRect.left &&
                characterRect.top < obstacleRect.bottom &&
                characterRect.bottom > obstacleRect.top
            ) {
                currentCollision = obstacle; // Guarda el objeto con el que se colisiona
                console.log(`Colisión detectada con: ${obstacle.id}`);
                return true; 
            }
        }
        console.log("Sin colisión con ningún obstáculo");
        return false; 
    }

    document.addEventListener("keydown", (e) => {
        const gameScreenRect = gameScreen.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        let prevPosX = posX;
        let prevPosY = posY;

        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (characterRect.top - step >= gameScreenRect.top) {
                    posY -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_arriba_sinfondo.png')";
                }
                break;
            case "ArrowDown":
            case "s":
                if (characterRect.bottom + step <= gameScreenRect.bottom) {
                    posY += step;
                    character.style.backgroundImage = "url('Imagenes/blackie_abajo_sinfondo.png')";
                }
                break;
            case "ArrowLeft":
            case "a":
                if (characterRect.left - step >= gameScreenRect.left) {
                    posX -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_izquierda_sinfondo.png')";
                }
                break;
            case "ArrowRight":
            case "d":
                if (characterRect.right + step <= gameScreenRect.right) {
                    posX += step;
                    character.style.backgroundImage = "url('Imagenes/blackie_derecha_sinfondo.png')";
                }
                break;
            case "e": // Interacción con la tecla "e"
                if (currentCollision) {
                    interactWithObject(currentCollision);
                }
                break;
        }

        updateCharacterPosition();

        if (checkCollision()) {
            console.log("Colisión detectada");
            posX = prevPosX;
            posY = prevPosY;
            updateCharacterPosition();
        } else {
            console.log("Sin colisión");
        }
    });

    function interactWithObject(object) {
        // Lógica de interacción específica para cada objeto
        switch (object.id) {
            case "maceta":
                alert("maceta"); //aqui encuentras la llave y tiene que salir directamente la imagen de la llave
                break;
            case "mesa":
                alert("mesa"); //aqui NO HAY NADA
                break;
            case "escritorio":
                alert("escritorio"); //abres el cajon con la llave que ecncontraste y te da la nota
                break;
            case "puerta":
                alert("La puerta está cerrada. Necesitas una llave."); //se necesita hacer el reloj para que se abra
                break;
            case "reloj":
                const userInput = prompt("¿Qué hora crees que es? (Formato HH:MM)"); //aqui utilizas la nota para descifrarlo
                if (userInput === "09:42") {
                    alert("¡Hora correcta!");
                } else {
                    alert("Sigue intentando.");
                }
                break;
            default:
                alert("No hay nada interesante aquí.");
        }
    }
});