const grid = document.querySelector('.breakout-grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const userStart = [230,10]
const ballDiameter = 20
let userCurrent = userStart
const ballStart = [270, 40]
let ballCurrent = ballStart
let timerId
let xDirection = 2
let yDirection = 2
let score = 0

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

// draw all blocks
function addBlocks () {
    for (let i=0; i <blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//  add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//  add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userCurrent[0] > 0) {
                userCurrent[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (userCurrent[0] < (boardWidth - blockWidth)) {
                userCurrent[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// draw user
function drawUser() {
    user.style.left = userCurrent[0] + 'px'
    user.style.bottom = userCurrent[1] +'px'
}

// draw ball
function drawBall() {
    ball.style.left = ballCurrent[0] + 'px'
    ball.style.bottom = ballCurrent[1] + 'px'
}

// move ball
function moveBall() {
    ballCurrent[0] += xDirection
    ballCurrent[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 30)

//  check for collisions
function checkForCollisions() {
//     check for walls
    if (ballCurrent[0] >= (boardWidth - ballDiameter) || ballCurrent[0] <= 0 || ballCurrent[1] >= (boardHeight - ballDiameter)) {
        changeDirection()
    }
//     check for game over
    if (ballCurrent[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = `You lose. Your final score was: ${score}.`
        document.removeEventListener('keydown', moveUser)
    }
//     check for blocks
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrent[0] > blocks[i].bottomLeft[0] && ballCurrent[0] < blocks[i].bottomRight[0]) &&
            (ballCurrent[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrent[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            score += 10
            scoreDisplay.innerHTML = score
            changeDirection()

            if (blocks.length === 0) {
                clearInterval(timerId)
                scoreDisplay.innerHTML = `You WIN! Your final score was: ${score}.`
                document.removeEventListener('keydown', moveUser)
            }
        }
    }
//     check for user
    if (
        (ballCurrent[0] > userCurrent[0] && ballCurrent[0] < userCurrent[0] + blockWidth) &&
        (ballCurrent[1] > userCurrent[1] && ballCurrent[1] < userCurrent[1] + blockHeight)
    ) {
        changeDirection()
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}



