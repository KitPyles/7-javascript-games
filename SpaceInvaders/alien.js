// DOM items
const resultsDisplay = document.getElementById('.results');
const scoreDisplay = document.getElementById('.score');

// board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * (columns / 2) - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}
let shipImg;
let shipVelocityX = tileSize;

// aliens
let alienArray = [];
let alienWidth = tileSize *2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienRows = 2;
let alienCols = 3;
let alienCount = 0; // # of aliens to defeat
let alienVelocityX = 1; // alien movement speed

// bullets
let bulletArray= [];
let bulletVelocityY = -10; // bullet move speed

let score = 0;
let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    let bgImages = [
        "/SpaceInvaders/media/bg1.png",
        "/SpaceInvaders/media/bg2.png",
        "/SpaceInvaders/media/bg3.png",
        "/SpaceInvaders/media/bg4.png",
        "/SpaceInvaders/media/bg5.png",
        "/SpaceInvaders/media/bg6.png",
        "/SpaceInvaders/media/bg7.png",
        "/SpaceInvaders/media/bg8.png",
        "/SpaceInvaders/media/bg9.png"
    ];
    let randomImgName = bgImages[Math.floor(Math.random() * bgImages.length)];
    board.style.backgroundImage = `url(${randomImgName})`;
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d") // used for drawing on the board

//     draw initial ship
//     context.fillStyle = "green";
//     context.fillRect(ship.x, ship.y, ship.width, ship.height);
//    load ship images
    shipImg = new Image();
    shipImg.src = "./media/ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "./media/alien.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener('keydown', moveShip);
    document.addEventListener('keyup',shoot);
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0,0, board.width, board.height);
    // ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    // aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;
            // if alien touches border, switch direction
            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;
                // move aliens 1 row
                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alien.height;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y >= ship.y) {
                gameOver = true;
                resultsDisplay.innerHTML = `GAME OVER!! You earned ${score} points!`
            }
        }
    }
    // bullets
    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // bullet collision
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        }
    }
    // clear bullets
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    // next level
    if (alienCount === 0) {
        alienCols = Math.min(alienCols + 1, columns/2 - 2);
        alienRows = Math.min(alienRows + 1, rows - 4);
        alienVelocityX += 0.2; //speed up aliens
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    // score
    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText(score.toString(), 5, 20);
}

function moveShip(e) {
    if (gameOver) return;
    if ((e.code === 'ArrowLeft' || e.keyCode === 65) && ship.x -shipVelocityX >= 0) {
        ship.x -= shipVelocityX;
    } else if ((e.code === 'ArrowRight' || e.keyCode === 68) && ship.x + shipVelocityX + shipWidth <= board.width) {
        ship.x += shipVelocityX;
    }
}

function createAliens() {
    for (let c = 0; c < alienCols; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e) {
    if (gameOver) return;
    if (e.code === "Space") {
        // shoot
        let bullet = {
            x: ship.x + shipWidth * 15/32,
            y: ship.y,
            width: tileSize/8,
            height: tileSize/2,
            used: false
        }
        bulletArray.push(bullet);
    }
}

function detectCollision(a,b) {
    return a.x < b.x + b.width &&  // a's top left corner doesn't reach b's top left corner
        a.x +a.width > b.x &&        // a's top right corner passes b's top left corner
        a.y < b.y + b.height &&     // a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;         // a's bottom left corner passes b's top left corner
}









