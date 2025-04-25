
    
    document.addEventListener("DOMContentLoaded", () => {
        const character = document.getElementById("character");
        const gameScreen = document.getElementById("gameScreen");
        
        let posX = 0;
        let posY = 0;
        const step = 20;
    

        document.getElementById("startButton").addEventListener("click", () => {
            document.getElementById("startScreen").style.display = "none";
            gameScreen.style.display = "block";
          
            posX = (gameScreen.offsetWidth - character.offsetWidth) / 2;
            posY = (gameScreen.offsetHeight - character.offsetHeight) / 2;
            updateCharacterPosition();
        });
    
        function updateCharacterPosition() {
            character.style.top = posY + "px";
            character.style.left = posX + "px";
        }
    
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    posY -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_arriba_sinfondo.png')";
                    break;
                case "ArrowDown":
                case "s":
                    posY += step;
                    character.style.backgroundImage = "url('Imagenes/blackie_abajo_sinfondo.png')";
                    break;
                case "ArrowLeft":
                case "a":
                    posX -= step;
                    character.style.backgroundImage = "url('Imagenes/blackie_izquierda_sinfondo.png')";
                    break;
                case "ArrowRight":
                case "d":
                    posX += step;
                    character.style.backgroundImage = "url('Imagenes/blackie_derecha_sinfondo.png')";
                    break;
            }
            updateCharacterPosition();
        });
    });