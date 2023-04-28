const timeLeftDisplay = document.querySelector('#frogTimeLeft')
const resultDisplay = document.querySelector('#frogResult')
const startPauseButton = document.querySelector('#startPauseButton')
const squares = document.querySelector('.grid div')

function moveFrog(e) {
    switch (e.key) {
        case 'a':
        case 'ArrowLeft':
            console.log('left')
            break
        case 'w':
        case 'ArrowUp':
            console.log('up')
            break
        case 's':
        case 'ArrowDown':
            console.log('down')
            break
        case 'd':
        case 'ArrowRight':
            console.log('right')
            break
    }
}

document.addEventListener('keyup',moveFrog)