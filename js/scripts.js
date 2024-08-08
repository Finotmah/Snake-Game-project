var start = true;
var psc = false;
var plc = false;
var pso = false;

let d = "right";
var playGame;
const score = document.getElementById("score");
var value = 0;
score.textContent = "0";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
//divide screen into row and column
const scale = 10;
const row = canvas.height / scale;
const column = canvas.width / scale;
let snake = [];
let food = {};

function playing() {

    snake[0] = {
        x: (Math.floor(Math.random() * column)) * scale,
        y: (Math.floor(Math.random() * row)) * scale
    }

    food = {
        x: (Math.floor(Math.random() * column)) * scale,
        y: (Math.floor(Math.random() * row)) * scale
    }

    document.onkeydown = direction;

    playGame = setInterval(draw, 100);

}

function direction(Event) {
    let key = Event.keyCode;
    if (key == 37 && d != "right") {
        d = "left";
    } else if (key == 38 && d != "down") {
        d = "up";
    } else if (key == 39 && d != "left") {
        d = "right";
    } else if (key == 40 && d != "up") {
        d = "down";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.stokeStyle = "blue";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

    // draw food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x, food.y, scale, scale)
    ctx.stokeStyle = "red";
    ctx.strokeRect(food.x, food.y, scale, scale);

    //old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //direction
    if (d == "left") snakeX -= scale;
    if (d == "right") snakeX += scale;
    if (d == "up") snakeY -= scale;
    if (d == "down") snakeY += scale;
    if (snakeX >= canvas.width) {
        snakeX = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width;
    }
    if (snakeY >= canvas.height) {
        snakeY = 0;
    }
    if (snakeY < 0) {
        snakeY = canvas.height;
    }
    //if snake eat food
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: (Math.floor(Math.random() * column)) * scale,
            y: (Math.floor(Math.random() * row)) * scale
        };
        value++;
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (eatSelf(newHead, snake)) {
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 80, 70);
        clearInterval(playGame);
        snake = [];
        food = {};
        start = true;
        value = 0;
        return;

    }

    snake.unshift(newHead);

    if (psc) {
        psc = false;
        pso = true;
        clearInterval(playGame);
    }
    score.textContent = value;

}

function eatSelf(head, snakeArr) {
    for (let i = 0; i < snakeArr.length; i++) {
        if (head.x == snakeArr[i].x && head.y == snakeArr[i].y) {
            return true;
        }
    }

}

const play = document.getElementById("py");
play.addEventListener("click", playfun);

function playfun() {
    if (start) {
        playing();
        start = false;
    } else if (pso) {
        pso = false;
        playGame = setInterval(draw, 100);
    }

}
const pause = document.getElementById("ps");
pause.addEventListener("click", pausefun);

function pausefun() {
    psc = true;
}