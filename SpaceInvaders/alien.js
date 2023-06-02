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

    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}










