document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const fondo = document.getElementById("fondo");

    let posX = 0;
    let posY = 0;
    const step = 20; // Ajusta el paso para que sea proporcional
    let currentCollision = null;

    // Lista de objetos con los que se puede colisionar
    const obstacles = Array.from(document.querySelectorAll(".obstacle"));

    document.getElementById("startButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        // Posicionar el personaje en la parte baja derecha del contenedor
        posX = fondo.offsetWidth - character.offsetWidth - 10; // 10px de margen
        posY = fondo.offsetHeight - character.offsetHeight - 10; // 10px de margen
        updateCharacterPosition();
    });

    function updateCharacterPosition() {
        character.style.top = `${posY}px`;
        character.style.left = `${posX}px`;
        console.log(`Posición actualizada: (${posX}px, ${posY}px)`);
    }

    function checkCollision() {
        const characterRect = character.getBoundingClientRect();
        const fondoRect = fondo.getBoundingClientRect();
        currentCollision = null;

        for (const obstacle of obstacles) {
            const obstacleRect = obstacle.getBoundingClientRect();

            // Verificar colisión
            if (
                characterRect.left < obstacleRect.right &&
                characterRect.right > obstacleRect.left &&
                characterRect.top < obstacleRect.bottom &&
                characterRect.bottom > obstacleRect.top
            ) {
                currentCollision = obstacle;
                console.log(`Colisión detectada con: ${obstacle.id}`);
                return true;
            }
        }
        console.log("Sin colisión con ningún obstáculo");
        return false;
    }

    document.addEventListener("keydown", (e) => {
        const fondoRect = fondo.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        let prevPosX = posX;
        let prevPosY = posY;

        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (characterRect.top - step >= fondoRect.top) {
                    posY -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_arriba_sinfondo.png')";
                }
                break;
            case "ArrowDown":
            case "s":
                if (characterRect.bottom + step <= fondoRect.bottom) {
                    posY += step;
                    character.style.backgroundImage = "url('Imagenes/blackie_abajo_sinfondo.png')";
                }
                break;
            case "ArrowLeft":
            case "a":
                if (characterRect.left - step >= fondoRect.left) {
                    posX -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_izquierda_sinfondo.png')";
                }
                break;
            case "ArrowRight":
            case "d":
                if (characterRect.right + step <= fondoRect.right) {
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
        }
    });

    function interactWithObject(object) {
        const messageBox = document.getElementById("messageBox");

        // Lógica de interacción específica para cada objeto
        switch (object.id) {
            case "maceta":
                messageBox.textContent = "¡Has encontrado una llave!";
                messageBox.style.display = "block";
                break;
            case "mesa":
                messageBox.textContent = "Es una bonita mesa, pero aquí no hay nada.";
                messageBox.style.display = "block";
                break;
            case "escritorio":
                messageBox.textContent = "¡Has logrado abrir el cajón del escritorio y has encontrado una nota!";
                messageBox.style.display = "block";
                break;
            case "puerta":
                messageBox.textContent = "La puerta está cerrada pero no hay cerradura";
                messageBox.style.display = "block";
                break;
            case "reloj":
                const userInput = prompt("¿Qué hora crees que es? (Formato HH:MM)");
                if (userInput === "09:42") {
                    messageBox.textContent = "¡Hora correcta!";
                } else {
                    messageBox.textContent = "Sigue intentando.";
                }
                messageBox.style.display = "block";
                break;
            default:
                messageBox.textContent = "No hay nada interesante aquí.";
                messageBox.style.display = "block";
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }
});