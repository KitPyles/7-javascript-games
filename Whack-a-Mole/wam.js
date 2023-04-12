const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startGame = document.querySelector('button');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

startGame.addEventListener("click", moveMole);

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result.toString();
            hitPosition = null;
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    currentTime--;
    timeLeft.innerHTML = currentTime.toString();

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert(`GAME OVER! Your final score is: ${result}.`);
    }
}

let countDownTimerId = setInterval(countDown, 1000)