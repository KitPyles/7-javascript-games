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

}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0,0, board.width, board.height);
    // ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    // aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;
            // if alien touches border, switch direction

            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
        }
    }
}

function moveShip(e) {
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






