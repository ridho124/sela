var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var snakeSize = 20;
var direction;
var snake = [];
var food = {};
var score = 0;

function createSnake() {
    var length = 5;
    for (var i = length - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / snakeSize)),
        y: Math.floor(Math.random() * (canvas.height / snakeSize))
    };
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var snakePart = snake[i];
        ctx.fillStyle = "green";
        ctx.fillRect(snakePart.x * snakeSize, snakePart.y * snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snakePart.x * snakeSize, snakePart.y * snakeSize, snakeSize, snakeSize);
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function checkCollision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateScore();

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction === "right") snakeX++;
    else if (direction === "left") snakeX--;
    else if (direction === "up") snakeY--;
    else if (direction === "down") snakeY++;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    var newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width / snakeSize ||
        snakeY >= canvas.height / snakeSize ||
        checkCollision(snakeX, snakeY, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

function changeDirection(event) {
    var key = event.keyCode;
    if (key === 37 && direction !== "right") direction = "left";
    else if (key === 38 && direction !== "down") direction = "up";
    else if (key === 39 && direction !== "left") direction = "right";
    else if (key === 40 && direction !== "up") direction = "down";
}

createSnake();
createFood();
var game = setInterval(draw, 100);
document.addEventListener("keydown", changeDirection);