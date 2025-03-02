const suits = ["♠", "♥", "♦", "♣"];
const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];

export const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5); // Shuffle deck
};

export const evaluateHand = (hand) => {
    const values = hand.map(card => card.value);
    const suits = hand.map(card => card.suit);

    // Convert face cards to numeric values for ranking
    const valueMap = { "J": 11, "Q": 12, "K": 13, "A": 14 };
    const numValues = values.map(v => valueMap[v] || parseInt(v)).sort((a, b) => a - b);

    const isFlush = suits.every(suit => suit === suits[0]);
    const isStraight = numValues.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
    
    const valueCounts = numValues.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});

    const counts = Object.values(valueCounts);
    const hasFourOfKind = counts.includes(4);
    const hasThreeOfKind = counts.includes(3);
    const hasTwoPairs = counts.filter(c => c === 2).length === 2;
    const hasPair = counts.includes(2);

    if (isFlush && isStraight) return "Straight Flush";
    if (hasFourOfKind) return "Four of a Kind";
    if (hasThreeOfKind && hasPair) return "Full House";
    if (isFlush) return "Flush";
    if (isStraight) return "Straight";
    if (hasThreeOfKind) return "Three of a Kind";
    if (hasTwoPairs) return "Two Pairs";
    if (hasPair) return "One Pair";

    return "High Card";
};
