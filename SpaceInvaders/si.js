const grid = document.querySelector('.si-grid');
const resultsDisplay = document.querySelector('.results');
const scoreDisplay = document.querySelector('.score');
const startButton = document.querySelector('#startButton')
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]
let shotId;
let score = 0;
let currentPlayerIndex = 202;
let width = 15;
let direction = 1;
let invaderId;
let goingRight = true;
let currentShotIndex;
let aliensRemoved = [];
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
const squares = Array.from(document.querySelectorAll('.si-grid div'));
squares[currentPlayerIndex].classList.add('player');

function drawInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }
}
function removeInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
    }
}
function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = (alienInvaders[alienInvaders.length-1] % width) === (width - 1)
    removeInvaders();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
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

    drawInvaders();

    if (squares[currentPlayerIndex].classList.contains('invader') && squares[currentPlayerIndex].classList.contains('player')) {
        resultsDisplay.innerHTML = "Game Over!";
        clearInterval(invaderId);
        document.removeEventListener('keydown', playerActions);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length - width)) {
            resultsDisplay.innerHTML = "Game Over!";
            clearInterval(invaderId);
            document.removeEventListener('keydown', playerActions);
        }
    }

    if (aliensRemoved.length === alienInvaders.length) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].classList.remove('boom');
            squares[i].classList.remove('shot');
        }
        resultsDisplay.innerHTML = `You Win!! Final Score: ${score}`;
        document.removeEventListener('keydown', playerActions);
        clearInterval(invaderId);
    }
}
class Shot {
    constructor() {
        this.currentShotIndex = currentPlayerIndex - width;
        this.squares = squares
    }

    shoot() {
        squares[this.currentShotIndex].classList.add('shot');
        setInterval(this.moveShot, 100);
    }

    moveShot() {
        let shot = this.squares[this.currentShotIndex];
        shot.classList.remove('shot');
        if (this.currentShotIndex >= width) {
            this.currentShotIndex -= width;
            shot.classList.add('shot');
        }
        if (squares[currentShotIndex].classList.contains('invader')) {
            squares[currentShotIndex].classList.remove('shot');
            squares[currentShotIndex].classList.remove('invader');
            squares[currentShotIndex].classList.add('boom');
            clearInterval(shotId);
            score++;
            scoreDisplay.innerHTML = score.toString();

            setTimeout(() => squares[currentShotIndex].classList.remove('boom'), 500);

            const alienRemoved = alienInvaders.indexOf(currentShotIndex);
            aliensRemoved.push(alienRemoved);
            squares[currentShotIndex].remove();
        }
    }
}
function movePlayerLeft() {
    (currentPlayerIndex % width !== 0) ? (currentPlayerIndex--) : (currentPlayerIndex += 0);
}
function movePlayerRight() {
    ((currentPlayerIndex % width) < (width - 1)) ? (currentPlayerIndex++) : (currentPlayerIndex += 0);
}
function playerActions(e) {
    squares[currentPlayerIndex].classList.remove('player');
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            let shot = new Shot();
            shotId = setInterval(shot.moveShot, 100);
            break;
        case 'a':
        case 'ArrowLeft':
            movePlayerLeft();
            break;
        case 'd':
        case 'ArrowRight':
            movePlayerRight();
            break;
    }
    squares[currentPlayerIndex].classList.add('player');
}
function startGame() {
    drawInvaders();
    invaderId = setInterval(moveInvaders, 600);
    document.addEventListener('keydown', playerActions);
}

startButton.addEventListener('click', startGame)