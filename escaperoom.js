document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const gameScreen = document.getElementById("gameScreen");
    const maceta = document.getElementById("maceta");
    const mesa = document.getElementById("mesa");
    const escritorio = document.getElementById("escritorio");

    let posX = 0;
    let posY = 0;
    const step = 20; // Paso reducido para movimiento más suave

    let gameWidth = 0;
    let gameHeight = 0;
    let characterWidth = 0;
    let characterHeight = 0;

    function recalculateDimensions() {
        gameWidth = gameScreen.offsetWidth;
        gameHeight = gameScreen.offsetHeight;
        characterWidth = character.offsetWidth;
        characterHeight = character.offsetHeight;
    }

    function updateCharacterPosition() {
        character.style.top = posY + "px";
        character.style.left = posX + "px";
    }

    // Función de colisión con márgenes
    function isCollision(obstacle) {
        const margin = 10; // Margen de seguridad
        const charLeft = posX + margin;
        const charTop = posY + margin;
        const charRight = posX + characterWidth - margin;
        const charBottom = posY + characterHeight - margin;

        const obstLeft = obstacle.offsetLeft;
        const obstTop = obstacle.offsetTop;
        const obstRight = obstLeft + obstacle.offsetWidth;
        const obstBottom = obstTop + obstacle.offsetHeight;

        return !(
            charBottom < obstTop ||
            charTop > obstBottom ||
            charRight < obstLeft ||
            charLeft > obstRight
        );
    }

    // Iniciar juego
    document.getElementById("startButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none";
        gameScreen.style.display = "block";
        
        setTimeout(() => {
            recalculateDimensions();
            posX = (gameWidth - characterWidth) / 2;
            posY = (gameHeight - characterHeight) / 2;
            updateCharacterPosition();
        }, 10);

        window.addEventListener("resize", recalculateDimensions);
    });

    // Manejo de movimiento
    document.addEventListener("keydown", (e) => {
        const prevX = posX;
        const prevY = posY;
        const key = e.key.toLowerCase();

        switch (key) {
            case "arrowup":
            case "w":
                posY = Math.max(0, posY - step);
                character.style.backgroundImage = "url('Imagenes/blackie_arriba_sinfondo.png')";
                break;
            case "arrowdown":
            case "s":
                posY = Math.min(gameHeight - characterHeight, posY + step);
                character.style.backgroundImage = "url('Imagenes/blackie_abajo_sinfondo.png')";
                break;
            case "arrowleft":
            case "a":
                posX = Math.max(0, posX - step);
                character.style.backgroundImage = "url('Imagenes/blackie_izquierda_sinfondo.png')";
                break;
            case "arrowright":
            case "d":
                posX = Math.min(gameWidth - characterWidth, posX + step);
                character.style.backgroundImage = "url('Imagenes/blackie_derecha_sinfondo.png')";
                break;
        }

        updateCharacterPosition();

        // Verificar colisión con todos los obstáculos
        const obstacles = [maceta, mesa, escritorio];
        if (obstacles.some(obstacle => isCollision(obstacle))) {
            posX = prevX;
            posY = prevY;
            updateCharacterPosition();
        }
    });
});