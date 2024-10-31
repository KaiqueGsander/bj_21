const playerHand = [];
const dealerHand = [];
const playerScoreElem = document.getElementById("player-score");
const dealerScoreElem = document.getElementById("dealer-score");
const playerHandElem = document.getElementById("player-hand");
const dealerHandElem = document.getElementById("dealer-hand");
const messageElem = document.getElementById("message");

const suits = ["♦", "♣", "♥", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

document.getElementById("hit-btn").addEventListener("click", hit);
document.getElementById("stand-btn").addEventListener("click", stand);
document.getElementById("restart-btn").addEventListener("click", restartGame);

function getCardValue(card) {
    if (["J", "Q", "K"].includes(card.value)) return 10;
    if (card.value === "A") return 11;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = hand.reduce((acc, card) => acc + getCardValue(card), 0);
    hand.forEach(card => {
        if (score > 21 && card.value === "A") score -= 10;
    });
    return score;
}

function updateScore() {
    playerScoreElem.textContent = `Jogador: ${calculateScore(playerHand)}`;
    dealerScoreElem.textContent = `Dealer: ${calculateScore(dealerHand)}`;
}

function renderCard(card, target) {
    const cardElem = document.createElement("div");
    cardElem.classList.add("card");
    cardElem.textContent = `${card.value} ${card.suit}`;
    target.appendChild(cardElem);
}

function dealCard(hand, target) {
    const card = {
        suit: suits[Math.floor(Math.random() * suits.length)],
        value: values[Math.floor(Math.random() * values.length)]
    };
    hand.push(card);
    renderCard(card, target);
    updateScore();
}

function hit() {
    dealCard(playerHand, playerHandElem);
    if (calculateScore(playerHand) > 21) endGame("Você estourou! Dealer vence.");
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealCard(dealerHand, dealerHandElem);
    }
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame("Você venceu!");
    } else if (dealerScore === playerScore) {
        endGame("Empate!");
    } else {
        endGame("Dealer vence!");
    }
}

function endGame(message) {
    messageElem.textContent = message;
    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;
}

function restartGame() {
    playerHand.length = 0;
    dealerHand.length = 0;
    playerHandElem.innerHTML = "";
    dealerHandElem.innerHTML = "";
    messageElem.textContent = "";
    document.getElementById("hit-btn").disabled = false;
    document.getElementById("stand-btn").disabled = false;
    dealCard(playerHand, playerHandElem);
    dealCard(playerHand, playerHandElem);
    dealCard(dealerHand, dealerHandElem);
}

restartGame();
