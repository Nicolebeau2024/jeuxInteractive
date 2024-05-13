const canvas = document.querySelector("canvas") //on recupere le canva (zone e jeux)
const context = canvas.getContext('2d') // on definit le context, on definit que ce serra en 2d.

let box = 20 // definit la taille des cases de ce tableau "de jeux"

let snake = []; // initialsie le serpent comme un tableau de cohordonner qui commence au milieu de notre canvas.
snake[0] = { x: 10*box, y: 10*box } // "la tete du serpent", egale a un objet dans le quel on va definir des parametres, la il est centre en x et y a 10 (qui correspond a la mitier de la zone qui en fait 20, il n'y a qu'un donner dans le tableau du serpent donc que la tete. )

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // "la nouriture, qui nous permet d'agrandir le serpent", permet de cree de la nouriture aleatoirement dans notre box "random" (dans notre tableu de cohordonées): une decimale multiplier par 15 + 1 et math.random arondi a un entier  
    y: Math.floor(Math.random() * 15 + 1) * box //meme chose pour l'axe y. qui nous permet de defnir une position aleatoire (mais pas le "carré de nouriture")
}

let score = 0 // stock le score

let d // stock la direction de notre serpent

document.addEventListener("keydown", direction); //ecouteur de clavier pour verifier sur quel touche on clic, fonction appeler a chaque fois que l'on touche a une touche de durection.

function direction(event){ //event appeler sur l'evenement key down.
    let key = event.keyCode; // qui contiendra les code des toouches (chaque touches correspond a un code)
    if(key == 37 && d != "RIGHT"){ // cette condition dit que si on appui sur la touche de gauche (corrspondant au code 37), et qu la direction est differente de droite (car dans le jeux de snake au depart le serpent commence par avacer vers la droite, on ata d'etre sur qu'il n'avance plus vers al droite avant de lui permettre d'aller vers la gauche) (pour ne pas revenir sur son corps) 
        d = "LEFT";
    } else if (key == 38 && d != "DOWN"){ // meme principe
        d = "UP";
    } else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    } else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function draw(){ // permet d'afficher tout ce qu'il y a dans le canvas
    context.clearRect(0, 0, 400, 400) // innitialise les valeur la taille de notre canvas

    for(let i = 0; i < snake.length; i++){ // permet de faie une boucle sur le nobre de cubes dont est constituer notre serpent
        context.fillStyle = (i == 0) ? "green" : "white" // on dessine, differentie la tete du corp (la tete en vert le corp en blanc)
        context.fillRect(snake[i].x, snake[i].y, box, box) // pour chaque element du corp du serpent on efinit la taille d'une "boite" du tableau (un carré = 20 sur 20 (le height et le width = position x et y))
        context.strokeStyle = "red" // donne une bordure rouge autour des element (corps et tete)
        context.strokeRect(snake[i].x, snake[i].y, box, box); // pour que la bordure suive bien son parent (le rectangle)
    }

        context.fillStyle = "orange" // creation de la nouriture, on lui donne la couleur Orange
        context.fillRect(food.x, food.y, box, box); // on appele encore context.fillRect, on appel "x" pour l'aleatoire (créée plus haut), avec box et box pour faire des case de 20 sur 20 comme précedemnt.

        let snakeX = snake[0].x // snake[0] equivaut a la tete du serpent et .x et .y à la position, on recupere ansi la position de la tete de notre serpent
        let snakeY = snake[0].y

        if(d == "LEFT") snakeX -= box; // cela decrit que si on appui une fois sur la fleche de gauche cela reduit la position de la tete d'une box
        if(d == "UP") snakeY -= box;
        if(d == "RIGHT") snakeX += box
        if(d == "DOWN") snakeY += box // met à jour la position du serpent avec la direction des fleches du clavier

        if(snakeX == food.x && snakeY == food.y){ // verifier si le serpent a manger la nouriture en passant dessu, donc si la tete du serpent ce trouve sur la position de la nouriture 
            score++; // si c'est le cas on incremente de score de 1
            food = { // on re genere une nouriture (a une position aleatoire)
                x: Math.floor(Math.random() * 15 + 1) * box, // "la nouriture, qui nous permet d'agrandir le serpent", permet de cree de la nouriture aleatoirement dans notre box "random" (dans notre tableu de cohordonées): une decimale multiplier par 15 + 1 et math.random arondi a un entier  
                y: Math.floor(Math.random() * 15 + 1) * box //meme chose pour l'axe y. qui nous permet de defnir une position aleatoire (mais pas le "carré de nouriture")
            }
        } else {
            snake.pop() // si on a pas manger, on enleve la derniere partie du serpent
        }

    

        let newHead = { // on defnini une nouvelle tete du serpent, on definit qu'il est bien en position x et y de la position initiale
            x: snakeX,
            y: snakeY
        }

            if(snakeX < 0 || snakeY < 0 || snakeX > 19*box || snakeY > 19*box || collision(newHeah, snake)) { // si la position de la tete est inferieur a 0 (cad qu'elle touche la parait de droite , du haut , du bas , ou de droite), puis on declare une nouvelle fonction colision qui vient verifier si la tete du serpent vien conier sur son corps
                clearInterval(game); // si la tete vien cogner sur le serpent on arrete l'interval (d'affichage du jeux, l'avancement du serpent toute les "300" millisecondes) qu'on aura definit a la fin 
                alert("looZer ';..;'")
            }

            snake.unshift(newHead); // pour afficher la nouvelle tete au debut du serpent

            context.fillStyle = "red" // dessine le score
            context.font = "30px Arial"
            context.fillText(score, 2*box, 1.6*box) // donne les coordonner de notre text ( en haut a gauche)

        }

        function collision(head, array) { // fonction colision argument head et array, ce que l'on passe, car le snake et un tableau, et le head est donc la nouvel tete du serpent
            for(let g = 0; g < array.length; g++) { // "array.length" le nombre de case dont detien le corps du serpent
                if(head.x == array[g].x && head.y == array[g].y) { // si la tete touche un element du corps en x et en y cela retourn true (colision de la tete)
                    return true; // true "oui" il y  une colision
                }
            }
            return false // on sort de cette boucle "for"
        }

        let game = setInterval(draw, 100) // creation d'une nouvelle constante "game" plus haut dans clear intervale "game", on fait un set intervale sur tte la fonction qu'on a cree "draw()" tte les 100 milli secondes