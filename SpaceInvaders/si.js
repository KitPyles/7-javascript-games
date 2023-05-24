const grid = document.querySelector('.si-grid');
const resultsDisplay = document.querySelector('.results')
const scoreDisplay = document.querySelector('.score')
let currentPlayerIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;

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
grid.style.backgroundImage = `url(${randomImgName})`;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.si-grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i <alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add('invader')
    }
}

function remove() {
    for (let i = 0; i <alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

draw()

squares[currentPlayerIndex].classList.add('player');

function movePlayer(e) {
    squares[currentPlayerIndex].classList.remove('player');
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            (currentPlayerIndex % width !== 0) ? (currentPlayerIndex--) : (currentPlayerIndex += 0)
            break
        case 'ArrowRight':
        case 'd':
            ((currentPlayerIndex % width) < (width - 1)) ? (currentPlayerIndex++) : (currentPlayerIndex += 0)
            break
    }
    squares[currentPlayerIndex].classList.add('player');
}
document.addEventListener('keydown', movePlayer)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width - 1;
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i <alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    draw()

    if (squares[currentPlayerIndex].classList.contains('invader') && squares[currentPlayerIndex].classList.contains('player')) {
        resultsDisplay.innerHTML = "Game Over!";
        clearInterval(invadersId);
        document.removeEventListener('keydown',movePlayer);
        document.removeEventListener('keydown', shoot);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length - width)) {
            resultsDisplay.innerHTML = "Game Over!";
            clearInterval(invadersId);
            document.removeEventListener('keydown',movePlayer);
            document.removeEventListener('keydown', shoot);
        }
    }
}

invadersId = setInterval(moveInvaders, 100)

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentPlayerIndex - width;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('shot');
        if (currentLaserIndex > width) {
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('shot');
        } else {
            squares[currentLaserIndex].classList.remove('shot');
        }
    }
    switch(e.key) {
        case "w":
        case "ArrowUp":
            laserId = setInterval(moveLaser, 100);
            break;
    }
}

document.addEventListener('keydown', shoot)



















