const timeLeftDisplay = document.querySelector('#frogTimeLeft')
const resultDisplay = document.querySelector('#frogResult')
const startPauseButton = document.querySelector('#startPauseButton')
const squares = document.querySelectorAll('.frogger-grid div')
const boatsLeft = document.querySelectorAll('.boat-left')
const  boatsRight = document.querySelectorAll('.boat-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const width = 9
const minIndex = 63
const maxIndex = 80
let currentIndex = Math.floor(Math.random() * (maxIndex - minIndex +1) + minIndex)
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

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.innerHTML = currentTime.toString()
    boatsLeft.forEach(boatL => moveBoatLeft(boatL))
    boatsRight.forEach(boatR => moveBoatRight(boatR))
    carsLeft.forEach(carL => moveCarLeft(carL))
    carsRight.forEach(carR => moveCarRight(carR))
}

function checkOutcome () {
    lose()
    win()
}

function moveBoatLeft(boatL) {
    switch (true) {
        case boatL.classList.contains('b1'):
            boatL.classList.remove('b1')
            boatL.classList.add('b2')
            break
        case boatL.classList.contains('b2'):
            boatL.classList.remove('b2')
            boatL.classList.add('b3')
            break
        case boatL.classList.contains('b3'):
            boatL.classList.remove('b3')
            boatL.classList.add('b4')
            break
        case boatL.classList.contains('b4'):
            boatL.classList.remove('b4')
            boatL.classList.add('b5')
            break
        case boatL.classList.contains('b5'):
            boatL.classList.remove('b5')
            boatL.classList.add('b1')
            break
    }
}

function moveBoatRight(boatR) {
    switch (true) {
        case boatR.classList.contains('b6'):
            boatR.classList.remove('b6')
            boatR.classList.add('b10')
            break
        case boatR.classList.contains('b7'):
            boatR.classList.remove('b7')
            boatR.classList.add('b6')
            break
        case boatR.classList.contains('b8'):
            boatR.classList.remove('b8')
            boatR.classList.add('b7')
            break
        case boatR.classList.contains('b9'):
            boatR.classList.remove('b9')
            boatR.classList.add('b8')
            break
        case boatR.classList.contains('b10'):
            boatR.classList.remove('b10')
            boatR.classList.add('b9')
            break
    }
}

function moveCarLeft(carL) {
    switch (true) {
        case carL.classList.contains('c1'):
            carL.classList.remove('c1')
            carL.classList.add('c2')
            break
        case carL.classList.contains('c2'):
            carL.classList.remove('c2')
            carL.classList.add('c3')
            break
        case carL.classList.contains('c3'):
            carL.classList.remove('c3')
            carL.classList.add('c4')
            break
        case carL.classList.contains('c4'):
            carL.classList.remove('c4')
            carL.classList.add('c5')
            break
        case carL.classList.contains('c5'):
            carL.classList.remove('c5')
            carL.classList.add('c1')
            break
    }
}

function moveCarRight(carR) {
    switch (true) {
        case carR.classList.contains('c6'):
            carR.classList.remove('c6')
            carR.classList.add('c10')
            break
        case carR.classList.contains('c7'):
            carR.classList.remove('c7')
            carR.classList.add('c6')
            break
        case carR.classList.contains('c8'):
            carR.classList.remove('c8')
            carR.classList.add('c7')
            break
        case carR.classList.contains('c9'):
            carR.classList.remove('c9')
            carR.classList.add('c8')
            break
        case carR.classList.contains('c10'):
            carR.classList.remove('c10')
            carR.classList.add('c9')
            break
    }
}

function lose() {
    switch (true) {
        case squares[currentIndex].classList.contains('b4'):
        case squares[currentIndex].classList.contains('b5'):
        case squares[currentIndex].classList.contains('b6'):
        case squares[currentIndex].classList.contains('b10'):
            resultDisplay.innerHTML ="Oh, no! You fell in the radioactive runoff!"
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            squares[currentIndex].classList.remove('frog')
            document.removeEventListener('keyup', moveFrog)
            break
        case squares[currentIndex].classList.contains('c1'):
        case squares[currentIndex].classList.contains('c3'):
        case squares[currentIndex].classList.contains('c7'):
        case squares[currentIndex].classList.contains('c10'):
            resultDisplay.innerHTML = "Oh, no! You got hit by a car!"
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            squares[currentIndex].classList.remove('frog')
            document.removeEventListener('keyup', moveFrog)
            break
        case currentTime <= 0:
            resultDisplay.innerHTML = "Oh, no! You ran out of time!"
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            squares[currentIndex].classList.remove('frog')
            document.removeEventListener('keyup', moveFrog)
            break
    }
}

function win() {
    if (squares[currentIndex].classList.contains('goal')) {
        resultDisplay.innerHTML = "You Win! Congratulations!"
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        squares[currentIndex].classList.add('frog')
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcome, 450)
        document.addEventListener('keyup', moveFrog)
    }
})