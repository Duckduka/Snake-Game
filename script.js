const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('gameOverScreen');
const restartBtn = document.getElementById('restartBtn');
const finalScore = document.getElementById('finalScore');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = true;

function drawSnake() {
    ctx.fillStyle = '#4CAF50';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawApple() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        generateApple();
    } else {
        snake.pop();
    }
}

function generateApple() {
    apple = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    snake.forEach((segment) => {
        if (apple.x === segment.x && apple.y === segment.y) {
            generateApple();
        }
    });
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function displayGameOver() {
    gameRunning = false;
    gameOverScreen.style.display = 'block';
    finalScore.textContent = `Your Score: ${score}`;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    apple = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    gameRunning = true;
    gameOverScreen.style.display = 'none';
    gameLoop();
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch (e.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

restartBtn.addEventListener('click', resetGame);

function gameLoop() {
    if (!gameRunning) return;

    if (checkCollision()) {
        displayGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    moveSnake();

    setTimeout(gameLoop, 100);
}

generateApple();
gameLoop();
