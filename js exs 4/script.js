let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let cardElements = document.querySelectorAll('.card');
let startButton = document.querySelector('.start-button');
let gameBoard = document.querySelector('.game-board');
let statusText = document.querySelector('.status-text');
let attemptsLeft = Math.floor(Math.random() * 3) + 3; 

const cardColors = ["red", "blue", "green", "purple", "orange", "pink"];
const shuffledColors = [...cardColors, ...cardColors].sort(() => Math.random() - 0.5);

cardElements.forEach((card, index) => {
    card.dataset.color = shuffledColors[index];
    card.style.backgroundColor = "white"; 
});

const shuffleCards = () => {
    let order = [];
    for (let i = 0; i < cardElements.length; i++) {
        order.push(i);
    }
    order.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].style.order = order[i];
    }
};

const flipCard = (card) => {
    if (card.classList.contains('flipped') || secondCard) return;

    card.classList.add('flipped');
    card.style.backgroundColor = card.dataset.color;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
};

const checkMatch = () => {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        setTimeout(() => {
            alert("So close! Keep trying.");
            flipBackCards();
        }, 500);
    } else {
        setTimeout(flipBackCards, 1000);
    }
};

const flipBackCards = () => {
    firstCard.style.backgroundColor = "white";
    secondCard.style.backgroundColor = "white";
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard = null;
    secondCard = null;
};

const startGame = () => {
    if (attemptsLeft > 0) {
        attemptsLeft--;
        alert("Nope, try again!"); 
    } else {
        alert("Fine, let's start the game...");
        startButton.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        shuffleCards();
        cardElements.forEach(card => {
            card.addEventListener('click', () => flipCard(card));
        });
        statusText.classList.add('hidden');
    }
};

startButton.addEventListener('click', startGame);
