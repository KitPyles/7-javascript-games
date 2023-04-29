const timeLeftDisplay = document.querySelector('#frogTimeLeft')
const resultDisplay = document.querySelector('#frogResult')
const startPauseButton = document.querySelector('#startPauseButton')
const squares = document.querySelectorAll('.frogger-grid div')
const logsLeft = document.querySelector('.log-left')
const  logsRight = document.querySelector('.log-right')
const carsLeft = document.querySelector('.car-left')
const carsRight = document.querySelector('.car-right')
const width = 9
let currentIndex = 76
let timerId
let outcomeTimerId
let currentTime = 20

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
    switch (e.key) {
        case 'a':
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex--
            break
        case 'w':
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 's':
        case 'ArrowDown':
            if (currentIndex + width < squares.length) currentIndex += width
            break
        case 'd':
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex++
            break
    }
    squares[currentIndex].classList.add('frog')
}

document.addEventListener('keyup', moveFrog)