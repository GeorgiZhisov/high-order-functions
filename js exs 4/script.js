let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let cardElements = document.querySelectorAll('.card');
let startButton = document.querySelector('.start-button');
let gameBoard = document.querySelector('.game-board');
let statusText = document.querySelector('.status-text');
let attemptsLeft = Math.floor(Math.random() * 3) + 3; // Randomize the number of fake popups (3–5)

// Predefined colors for card pairs
const cardColors = ["red", "blue", "green", "purple", "orange", "pink"];
const shuffledColors = [...cardColors, ...cardColors].sort(() => Math.random() - 0.5);

// Assign colors to cards
cardElements.forEach((card, index) => {
    card.dataset.color = shuffledColors[index];
    card.style.backgroundColor = "white"; // Start with all cards face down
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

    // Flip the card to reveal its color
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
        // Matched cards: Popup with "So Close" and flip them back
        setTimeout(() => {
            alert("So close! Keep trying.");
            flipBackCards();
        }, 500);
    } else {
        // No match: Flip them back after a delay
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
        alert("Nope, try again!"); // Popup message
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

// Add chaotic flashing text on the start button
startButton.classList.add('flash');
startButton.addEventListener('click', startGame);
