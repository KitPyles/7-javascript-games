const addGame = function (game) {
    let listItem =document.createElement("li");
    listItem.innerHTML = game;
    document.getElementById("game-section").appendChild(listItem);
}

let gameList = [
    '<a href="RPSLS/game.html">Rock-Paper-Scissors-Lizard-Spock</a>',
    '<a href="Memory/game.html">Memory</a>',
    '<a href="Whack-a-Mole/game.html">Whack-a-Mole</a>',
    '<a href="Breakout/game.html">Breakout</a>',
    '<a href="Frogger/game.html">Frogger</a>',
    '<a href="Connect4/game.html">Connect 4</a>',
    '<a href="SpaceInvaders/game.html">Space Invaders</a>'
]

document.addEventListener("DOMContentLoaded", function () {
    gameList.forEach(function (game) {
    addGame(game);
    })
})