const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
let userChoice;
let computerChoice;
let result;
let computer = "Computer Wins!";
let user = "User Wins!";

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
            result = computer;
        } else if (computerChoice === "scissors") {
            result = user;
        } else if (computerChoice === "lizard") {
            result = user;
        } else if (computerChoice === "Spock") {
            result = computer;
        }
    } else if (userChoice === "paper") {
        if (computerChoice === "scissors") {
            result = computer;
        } else if (computerChoice === "rock") {
            result = user;
        } else if (computerChoice === "lizard") {
            result = computer;
        } else if (computerChoice === "Spock") {
            result = user;
        }
    } else if (userChoice === "scissors") {
        if (computerChoice === "rock") {
            result = computer;
        } else if (computerChoice === "paper") {
            result = user;
        } else if (computerChoice === "lizard") {
            result = user;
        } else if (computerChoice === "Spock") {
            result = computer;
        }
    } else if (userChoice === "lizard") {
        if (computerChoice === "rock") {
            result = computer;
        } else if (computerChoice === "paper") {
            result = user;
        } else if (computerChoice === "scissors") {
            result = computer;
        } else if (computerChoice === "Spock") {
            result = user;
        }
    } else if (userChoice === "Spock") {
        if (computerChoice === "rock") {
            result = user;
        } else if (computerChoice === "paper") {
            result = computer;
        } else if (computerChoice === "scissors") {
            result = user;
        } else if (computerChoice === "lizard") {
            result = computer;
        }
    }
    resultDisplay.innerHTML = result;
}