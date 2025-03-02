const suits = ["♠", "♥", "♦", "♣"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5); // Shuffle deck
};

export const evaluateHand = (holeCards, communityCards) => {
    const fullHand = [...holeCards, ...communityCards];
    
    const valueMap = { "J": 11, "Q": 12, "K": 13, "A": 14 };
    const numValues = fullHand.map(card => valueMap[card.value] || parseInt(card.value)).sort((a, b) => a - b);
    const suits = fullHand.map(card => card.suit);
    
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

export const opponentDecision = (holeCards, communityCards) => {
    const handRank = evaluateHand(holeCards, communityCards);
    const rankOrder = [
        "High Card", "One Pair", "Two Pairs", "Three of a Kind",
        "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"
    ];
    const strength = rankOrder.indexOf(handRank);

    if (strength <= 1) return "fold";  // Opponent folds if weak
    if (strength >= 5) return "raise"; // Opponent raises if strong
    return "call";  // Otherwise, opponent calls
};
