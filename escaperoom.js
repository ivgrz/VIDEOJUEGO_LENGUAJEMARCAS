document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const fondo = document.getElementById("fondo");

    let posX = 0;
    let posY = 0;
    const step = 20; // Ajusta el paso para que sea proporcional
    let currentCollision = null;
    let isTimeCorrect = false; // Variable para rastrear si la hora correcta ha sido ingresada
    let hasKey = false; // Variable para rastrear si el jugador tiene la llave

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

        // Limpia el contenido previo del mensaje
        messageBox.innerHTML = "";

        // Lógica de interacción específica para cada objeto
        switch (object.id) {
            case "maceta":
                const messageTextMaceta = document.createElement("p");
                messageTextMaceta.textContent = "¡Encontré una llave! (っ◕‿◕)っ ♥";
                messageBox.appendChild(messageTextMaceta);

                const keyImage = document.createElement("img");
                keyImage.src = "Imagenes/llavebien.png";
                keyImage.alt = "Llave";
                messageBox.appendChild(keyImage);

                hasKey = true; // Marca que el jugador tiene la llave
                messageBox.style.display = "block";
                break;

            case "mesa":
                messageBox.textContent = "Es una bonita mesa, pero aquí no hay nada.";
                messageBox.style.display = "block";
                break;

            case "escritorio":
                if (hasKey) {
                    const messageTextEscritorio = document.createElement("p");
                    messageTextEscritorio.textContent = "¡Logré abrir el cajón del escritorio y he encontrado una nota! (◑.◑)";
                    messageBox.appendChild(messageTextEscritorio);

                    const noteImage = document.createElement("img");
                    noteImage.src = "Imagenes/CODIGOH.png";
                    noteImage.alt = "Nota";
                    noteImage.style.width = "100px";
                    noteImage.style.height = "auto";
                    noteImage.style.margin = "10px auto";
                    messageBox.appendChild(noteImage);
                } else {
                    messageBox.textContent = "El cajón está cerrado. Necesito una llave";
                }
                messageBox.style.display = "block";
                break;

            case "puerta":
                if (isTimeCorrect) {
                    messageBox.textContent = "¡La puerta está abierta! ¡Lo he logrado!";

                    // Crear botón de reinicio
                    const restartButton = document.createElement("button");
                    restartButton.textContent = "Reiniciar Juego";
                    restartButton.style.marginTop = "10px";
                    restartButton.style.padding = "10px 20px";
                    restartButton.style.cursor = "pointer";

                    // Agregar evento para recargar la página
                    restartButton.addEventListener("click", () => {
                        location.reload();
                    });

                    // Agregar el botón al mensaje
                    messageBox.appendChild(restartButton);
                } else {
                    messageBox.textContent = "La puerta está cerrada. Tengo que buscar la forma de abrirla (ㆆ_ㆆ)";
                }
                messageBox.style.display = "block";
                break;

            case "reloj":
                const userInput = prompt("¿Qué hora crees que es?");
                if (userInput === "09:42") {
                    isTimeCorrect = true; // Marca la hora como correcta
                    messageBox.textContent = "¿Qué temprano, no?";
                } else {
                    messageBox.textContent = "Justo esa no es ( ˘︹˘ )";
                }
                messageBox.style.display = "block";
                break;
//esto sobra???
            default:
                messageBox.textContent = "No hay nada interesante aquí";
                messageBox.style.display = "block";
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }
});