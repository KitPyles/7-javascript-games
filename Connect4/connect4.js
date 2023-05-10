document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.connect4-grid div')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#currentPlayer')
    let currentPlayer = 1
    let gameOver = false;

    const winningArrays = [
        [0,1,2,3],
        [0,7,14,21],
        [0,8,16,24],
        [1,2,3,4],
        [1,8,15,22],
        [1,9,17,25],
        [2,3,4,5],
        [2,9,16,23],
        [2,10,18,26],
        [3,4,5,6],
        [3,9,15,21],
        [3,10,17,24],
        [3,11,19,27],
        [4,11,18,25],
        [5,12,19,26],
        [6,13,20,27],
        [7,8,9,10],
        [7,14,21,24],
        [7,15,23,31],
        [8,9,10,11],
        [8,15,22,29],
        [8,16,24,32],
        [9,10,11,12],
        [9,16,23,30],
        [9,17,25,33],
        [10,11,12,13],
        [10,16,22,28],
        [10,17,24,31],
        [10,18,26,34],
        [11,18,25,32],
        [12,19,26,33],
        [13,20,27,34],
        [14,15,16,17],
        [14,21,28,35],
        [14,22,30,38],
        [15,16,17,18],
        [15,22,29,36],
        [15,23,31,39],
        [16,17,18,19],
        [16,23,30,37],
        [16,24,32,40],
        [17,18,19,20],
        [17,23,29,35],
        [17,24,31,38],
        [17,25,33,41],
        [18,25,32,39],
        [19,26,33,40],
        [20,27,34,41],
        [21,22,23,24],
        [22,23,24,25],
        [23,24,25,26],
        [24,25,26,27],
        [28,29,30,31],
        [29,30,31,32],
        [30,31,32,33],
        [31,32,33,34],
        [35,36,37,38],
        [36,37,38,39],
        [37,38,39,40],
        [38,39,40,41]
    ]

    if (!gameOver) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', handleClick);
        }
    } else if (gameOver) {
        setGameOver();
    }
    function handleClick() {
        const square = event.target
        const id = square.id

        if (gameOver) return;

        if (square.classList.contains('taken')) {
            alert('This square is already taken. Please, try again.')
            // if the square below your current square is taken, you can fill it
        } else if (squares[parseInt(id) + 7].classList.contains('taken')) {
            square.classList.add('taken')
            if (currentPlayer === 1) {
                square.classList.add('player1')
                currentPlayer = 2
            } else {
                square.classList.add('player2')
                currentPlayer = 1
            }
            displayCurrentPlayer.innerHTML = currentPlayer
            // if the user selects in unavailable square
        } else {
            alert('That is not a valid choice. Please, try again.')
        }
        checkBoard()
    }
    function checkBoard() {
        for (let y = 0; y < winningArrays.length; y++) {
            const square1 = squares[winningArrays[y][0]]
            const square2 = squares[winningArrays[y][1]]
            const square3 = squares[winningArrays[y][2]]
            const square4 = squares[winningArrays[y][3]]

            const s11 = square1.classList.contains('player1')
            const s21 = square2.classList.contains('player1')
            const s31 = square3.classList.contains('player1')
            const s41 = square4.classList.contains('player1')
            const s12 = square1.classList.contains('player2')
            const s22 = square2.classList.contains('player2')
            const s32 = square3.classList.contains('player2')
            const s42 = square4.classList.contains('player2')

            const takenSq = document.querySelectorAll('.taken');

            if (s11 && s21 && s31 && s41) {
                result.innerHTML = 'Player 1 wins!';
                gameOver = true;
                return;
            } else if (s12 && s22 && s32 && s42) {
                result.innerHTML = 'Player 2 wins!';
                gameOver = true;
                return;
            } else if (squares.length - takenSq.length === 0) {
                result.innerHTML = 'Draw!';
                gameOver = true;
                return;
            }
        }
        if (gameOver) {
            setGameOver();
        }
    }

    function setGameOver(message) {
        result.innerHTML = message;
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', handleClick)
        }
    }
})