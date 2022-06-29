// Se declaran las variable a utilizarse en canvas la parte grafica 
//este el del bloque de canvas altura y ancho  
var canvasWidth = 600;
var canvasHeight = 400;

var player;
var playerYPosition = 200;

var fallSpeed = 0;
var interval = setInterval(updateCanvas, 20);

var isJumping = false;
var jumpSpeed = 0;

var block;

// Crear una puntuación de 0 para empezar
var score = 0;
// Cree una variable para contener nuestro scoreLabel
var scoreLabel;

/**
 * En este apartado se realiza el inicio del juego, es decir, esta es la funcion principal
 * para que nuestro el juego de block hopper funcione de manera correcta. 
 */
function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    // Assign your scoreLabel variable a value from scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}

/**
 * En esta parte se declara la variable inicial para el dibujo del canvas, es decir, 
 * el ancho y el alto de la pantalla, en su respectivo html 
 */

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

/** 
 * Este nos permite crear una función que crea el jugador colocando el ancho y alto
 *  del cuadrado así como su posición inicial el x, creando de esta manera las dimensiones del 
 * respectivo juego. 
*/
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    // aqui se realiza el dibujo del juego y el color dell cuadro del jump
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //Se obtinene una gravedad al jugador haciendo que se aumente su caida en 0.1, para realizar el salto de caida. 
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }

    //Aqui una vez que llegue al suelo se cancela la gravedad, ya que crea la funcion stop
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }

    // esta es la funcion que nos permite realizar los saltos 
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}
/**
 * Esta funcion nos permite que crea los obstaculos con un ancho y 
 * alto aleatorio en un mínimo y máximo, de la dimencion en x , y.

 */
function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    // se pinta los obstaculos de color rojo, y dimensiona su ancho y altura. 
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}

/**
 * Función detecta la colision del jugador cuando esta entre x, y. 
 */
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
//se crea la puntuacion del jugador 
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Aqui se actualiza el canvas cuando se detecta la colision 
function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Vuelva a dibujar su puntaje y actualice el valor
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

// Se crea un numero aleatorio maximo y minimo para la funcionalidad del juego.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// se resetea el huego para comenzar de nuevo cuando el usuario llegue a cero. 
function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

//Se realiza la asigancion del body para ejecutar el juego desde el body del html , se asigna un encendido
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}