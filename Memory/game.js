const cardArray = [
    {
        name: "bear",
        img: "images/bear.png"
    },
    {
        name: "beaver",
        img: "images/beaver.png"
    },
    {
        name: "deer",
        img: "images/deer.png"
    },
    {
        name: "fox",
        img: "images/fox.png"
    },
    {
        name: "turkey",
        img: "images/turkey.png"
    },
    {
        name: "woodpecker",
        img: "images/woodpecker.png"
    },
    {
        name: "bear",
        img: "images/bear.png"
    },
    {
        name: "beaver",
        img: "images/beaver.png"
    },
    {
        name: "deer",
        img: "images/deer.png"
    },
    {
        name: "fox",
        img: "images/fox.png"
    },
    {
        name: "turkey",
        img: "images/turkey.png"
    },
    {
        name: "woodpecker",
        img: "images/woodpecker.png"
    }
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for (let i=0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "images/back.png");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard)
        gridDisplay.appendChild(card);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    if (optionOneId === optionTwoId) {
        alert("You clicked the same card!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute("src", "images/black.png");
        cards[optionTwoId].setAttribute("src", "images/black.png");
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen[0]);
        resultDisplay.innerHTML = cardsWon.length;
    } else {
        cards[optionOneId].setAttribute("src", "images/back.png");
        cards[optionTwoId].setAttribute("src", "images/back.png");
    }
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length === (cardArray.length/2)) {
        resultDisplay.innerHTML = "Congratulations! You've found them all!"
    }
}

function flipCard() {
    const cardId = this.getAttribute("data-id");
    let cardName = cardArray[cardId].name;
    let cardImg = cardArray[cardId].img;
    cardsChosen.push(cardName);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardImg);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 300);
    }
}

createBoard();