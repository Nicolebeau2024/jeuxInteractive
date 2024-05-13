
        // Récupère le canvas et le contexte 2D pour dessiner
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // Taille d'un bloc dans le jeu
        const blockSize = 20;

        // Largeur et hauteur du canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Initialisation du serpent avec une partie à la position (5, 5)
        let snake = [{x: 5, y: 5}];

        // Position aléatoire de la pomme dans le canvas
        let apple = {
            x: Math.floor(Math.random() * (canvasWidth / blockSize)),
            y: Math.floor(Math.random() * (canvasHeight / blockSize))
        };

        // Direction initiale du serpent (vers la droite)
        let direction = {x: 1, y: 0};

        // Score du joueur
        let score = 0;

        // Fonction de dessin du jeu
        function draw() {
            // Efface le canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Dessine le serpent
            ctx.fillStyle = "#000";
            snake.forEach(segment => ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize));

            // Dessine la pomme
            ctx.fillStyle = "red";
            ctx.fillRect(apple.x * blockSize, apple.y * blockSize, blockSize, blockSize);

            // Affiche le score
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);
        }

        // Fonction de mise à jour du jeu
        function update() {
            // Calcul de la nouvelle position de la tête du serpent
            const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

            // Ajoute la nouvelle tête du serpent
            snake.unshift(head);

            // Gestion de la collision avec la pomme
            if (head.x === apple.x && head.y === apple.y) {
                score++;
                apple = {
                    x: Math.floor(Math.random() * (canvasWidth / blockSize)),
                    y: Math.floor(Math.random() * (canvasHeight / blockSize))
                };
            } else {
                snake.pop();
            }

            // Gestion de la collision avec les bords du canvas
            if (head.x < 0 || head.x >= canvasWidth / blockSize || head.y < 0 || head.y >= canvasHeight / blockSize) {
                gameOver();
            }

            // Gestion de la collision avec le corps du serpent
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameOver();
                }
            }
        }

        // Fonction de fin de partie
        function gameOver() {
            clearInterval(gameLoop);
            alert("Game Over! Score: " + score);
            window.location.reload();
        }

        // Écouteur d'événements pour les touches du clavier
        document.addEventListener("keydown", function(event) {
            const keyPressed = event.key;
            switch (keyPressed) {
                case "ArrowUp":
                    if (direction.y !== 1) {
                        direction = {x: 0, y: -1};
                    }
                    break;
                case "ArrowDown":
                    if (direction.y !== -1) {
                        direction = {x: 0, y: 1};
                    }
                    break;
                case "ArrowLeft":
                    if (direction.x !== 1) {
                        direction = {x: -1, y: 0};
                    }
                    break;
                case "ArrowRight":
                    if (direction.x !== -1) {
                        direction = {x: 1, y: 0};
                    }
                    break;
            }
        });

        // Boucle de jeu qui met à jour et dessine le jeu toutes les 100 millisecondes
        let gameLoop = setInterval(function() {
            update();
            draw();
        }, 100);
