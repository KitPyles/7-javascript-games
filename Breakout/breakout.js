const grid = document.querySelector('.breakout-grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const userStart = [230,10]
let userCurrent = userStart

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

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

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

