const suits = ["♠", "♥", "♦", "♣"];
const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];

export const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            let cardValue = isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
            deck.push({ suit, value, cardValue });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
};

export const calculateTotal = (hand) => {
    let total = hand.reduce((sum, card) => sum + card.cardValue, 0);
    let aceCount = hand.filter(card => card.value === "A").length;

    while (total > 21 && aceCount > 0) {
        total -= 10; // Convert Ace from 11 to 1 if over 21
        aceCount--;
    }
    return total;
};
