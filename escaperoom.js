document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const fondo = document.getElementById("fondo");

    let posX = 0;
    let posY = 0;
    const step = 20;
    let currentCollision = null;
    let isTimeCorrect = false;
    let hasKey = false;
    let timerInterval;
    let timeRemaining = 300; // 5 minutos en segundos

    const obstacles = Array.from(document.querySelectorAll(".obstacle"));

    
    document.getElementById("startButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        posX = fondo.offsetWidth - character.offsetWidth - 10;
        posY = fondo.offsetHeight - character.offsetHeight - 10;
        updateCharacterPosition();

        startTimer();
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
            case "e":
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
        const interactionImageContainer = document.getElementById("interactionImageContainer");

        // Limpia el contenido previo del mensaje y la imagen
        messageBox.innerHTML = "";
        interactionImageContainer.innerHTML = "";
        interactionImageContainer.style.display = "none";

        switch (object.id) {
            case "maceta":
                const messageTextMaceta = document.createElement("p");
                messageTextMaceta.textContent = "¡Encontré una llave! (っ◕‿◕)っ ♥";
                messageBox.appendChild(messageTextMaceta);

                // Crear y mostrar imagen de la llave
                const keyImage = document.createElement("img");
                keyImage.src = "Imagenes/llavebien.png";
                keyImage.alt = "Llave";
                interactionImageContainer.appendChild(keyImage);
                interactionImageContainer.style.display = "block";

                hasKey = true;
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

                    // Crear y mostrar imagen de la nota
                    const noteImage = document.createElement("img");
                    noteImage.src = "Imagenes/CODIGOH.png";
                    noteImage.alt = "Nota";
                    interactionImageContainer.appendChild(noteImage);
                    interactionImageContainer.style.display = "block";
                } else {
                    messageBox.textContent = "El cajón está cerrado. Necesito una llave";
                }
                messageBox.style.display = "block";
                break;

            case "reloj":
                const userInput = prompt("¿Qué hora crees que es?");
                if (userInput === "09:42") {
                    isTimeCorrect = true;
                    messageBox.textContent = "Que temprano, ¿no? (¬‿¬)";
                } else {
                    messageBox.textContent = "Justo esa no es ( ˘︹˘ )";
                }
                messageBox.style.display = "block";
                break;

            case "puerta":
                if (isTimeCorrect) {
                    messageBox.textContent = "¡La puerta está abierta! ¡Lo he logrado!";
                    messageBox.style.display = "block";

                    // Mostrar el contenedor del botón de reinicio
                    const restartContainer = document.getElementById("restartContainer");
                    const restartButton = document.getElementById("restartButton");
                    restartContainer.style.display = "flex";

                    // Reiniciar el juego al hacer clic en el botón
                    restartButton.addEventListener("click", () => {
                        location.reload();
                    });
                } else {
                    messageBox.textContent = "La puerta está cerrada. Tengo que buscar la forma de abrirla (ㆆ_ㆆ)";
                    messageBox.style.display = "block";
                }
                break;

            default:
                messageBox.textContent = "No hay nada interesante aquí";
                messageBox.style.display = "block";
        }

        // Ocultar la imagen y el mensaje después de 5 segundos
        setTimeout(() => {
            interactionImageContainer.style.display = "none";
            messageBox.style.display = "none";
        }, 5000);
    }

    function startTimer() {
        const timerElement = document.getElementById("timer");
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
                const seconds = (timeRemaining % 60).toString().padStart(2, "0");
                timerElement.textContent = `${minutes}:${seconds}`;
            } else {
                clearInterval(timerInterval);
                showOutOfTimeMessage();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function showOutOfTimeMessage() {
        const messageBox = document.getElementById("messageBox");
        const restartContainer = document.getElementById("restartContainer");
        const restartButton = document.getElementById("restartButton");

        // Mostrar mensaje de tiempo agotado en el messageBox
        messageBox.innerHTML = ""; // Limpia el contenido previo
        messageBox.classList.add("out-of-time");

        const outOfTimeMessage = document.createElement("p");
        outOfTimeMessage.textContent = "¡Te quedaste sin tiempo!";
        messageBox.appendChild(outOfTimeMessage);
        messageBox.style.display = "block";

        // Mostrar el contenedor del botón de reinicio
        restartContainer.style.display = "flex";

        // Reiniciar el juego al hacer clic en el botón
        restartButton.addEventListener("click", () => {
            location.reload();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modalText");
    const closeModal = document.getElementById("closeModal");

    const tutorialButton = document.getElementById("tutorialButton");
    const creditsButton = document.getElementById("creditsButton");

    // Mostrar el modal con información del tutorial
    tutorialButton.addEventListener("click", () => {
        modalText.innerHTML = `
            <h1>Tutorial</h1>
            <img src="Imagenes/Teclas1.png" alt="Controles del juego" class="tutorial-image">
            <p>Bienvenido al Blackie Scape. Usa las teclas de flecha o "W" "A" "S" "D" para moverte.</p>
            <p>Interactúa con los objetos presionando la tecla "E".</p>
            <h3><p>¡Resuelve los acertijos y escapa antes de que se acabe el tiempo!</p><h3>
        `;
        modal.style.display = "flex";
    });

    // Mostrar el modal con información de los créditos
    creditsButton.addEventListener("click", () => {
        modalText.innerHTML = `
            <h1>Créditos</h1>
            <p>Desarrollado por: Andrea Mouriño e Iván Gutiérrez</p>
            <p>Imágenes/Ilustraciones: Andrea Mouriño </p>
            <p> Personajes: Blackie como <b>Blackie</b></p>
            <h3><p>Gracias por jugar.</p><h3>
        `;
        modal.style.display = "flex";
    });

    // Cerrar el modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});