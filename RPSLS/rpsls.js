const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
const userWins = document.getElementById("userTotalWins");
const computerWins = document.getElementById("computerTotalWins");
let userChoice;
let computerChoice;
let result;
let computer = "Computer Wins!";
let user = "User Wins!";
let userTotal = 0;
let computerTotal = 0;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener("click", function(event) {
    userChoice = event.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
}));

function generateComputerChoice () {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length);
    // console.log(randomNumber);

    if (randomNumber === 0) {
        computerChoice = "rock";
    } else if (randomNumber === 1) {
        computerChoice = "paper";
    } else if (randomNumber === 2) {
        computerChoice = "scissors";
    } else if (randomNumber === 3) {
        computerChoice = "lizard";
    } else if (randomNumber === 4) {
        computerChoice = "Spock";
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    if (userChoice === computerChoice) {
        result = "It's a Draw!";
    } else if (userChoice === "rock") {
        if (computerChoice === "paper") {
            result = `Paper covers Rock. ${computer}`;
        } else if (computerChoice === "scissors") {
            result = `Rock crushes Scissors. ${user}`;
        } else if (computerChoice === "lizard") {
            result = `Rock crushes Lizard. ${user}`;
        } else if (computerChoice === "Spock") {
            result = `Spock vaporizes Rock. ${computer}`;
        }
    } else if (userChoice === "paper") {
        if (computerChoice === "scissors") {
            result = `Scissors cut paper. ${computer}`;
        } else if (computerChoice === "rock") {
            result = `Paper covers Rock. ${user}`;
        } else if (computerChoice === "lizard") {
            result = `Lizard eats Paper. ${computer}`;
        } else if (computerChoice === "Spock") {
            result = `Paper disproves Spock. ${user}`;
        }
    } else if (userChoice === "scissors") {
        if (computerChoice === "rock") {
            result = `Rock crushes Scissors. ${computer}`;
        } else if (computerChoice === "paper") {
            result = `Scissors cut Paper. ${user}`;
        } else if (computerChoice === "lizard") {
            result = `Scissors decapitate Lizard. ${user}`;
        } else if (computerChoice === "Spock") {
            result = `Spock smashes Scissors. ${computer}`;
        }
    } else if (userChoice === "lizard") {
        if (computerChoice === "rock") {
            result = `Rock crushes Lizard. ${computer}`;
        } else if (computerChoice === "paper") {
            result = `Lizard eats Paper. ${user}`;
        } else if (computerChoice === "scissors") {
            result = `Scissors decapitate Lizard. ${computer}`;
        } else if (computerChoice === "Spock") {
            result = `Lizard poisons Spock. ${user}`;
        }
    } else if (userChoice === "Spock") {
        if (computerChoice === "rock") {
            result = `Spock vaporizes Rock. ${user}`;
        } else if (computerChoice === "paper") {
            result = `Paper disproves Spock. ${computer}`;
        } else if (computerChoice === "scissors") {
            result = `Spock smashes Scissors. ${user}`;
        } else if (computerChoice === "lizard") {
            result = `Lizard poisons Spock. ${computer}`;
        }
    }
    resultDisplay.innerHTML = result;

    if (result.includes(user)) {
        userTotal++;
    } else if (result.includes(computer)) {
        computerTotal++;
    }
    userWins.innerHTML = userTotal;
    computerWins.innerHTML = computerTotal;
}