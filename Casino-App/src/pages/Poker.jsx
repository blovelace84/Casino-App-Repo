import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { createDeck, evaluateHand} from "../utils/pokerUtils";
import BetControls from "../components/BetControls";

const Poker = () => {
    const { updateBalance } = usePlayer();
    const [deck, setDeck] = useState(createDeck());
    const [playerHand, setPlayerHand] = useState([]);
    const [opponentHand, setOpponentHand] = useState([]);
    const [gameResult, setGameResult] = useState(null);

    const handleBet = (amount) => {
        let newDeck = createDeck();
        let newPlayerHand = newDeck.slice(0, 5);
        let newOpponentHand = newDeck.slice(5, 10);

        setPlayerHand(newPlayerHand);
        setOpponentHand(newOpponentHand);
        setDeck(newDeck.slice(10));

        // Evaluate hands
        const playerRank = evaluateHand(newPlayerHand);
        const opponentRank = evaluateHand(newOpponentHand);

        let winner = "It's a tie!";
        let won = false;

        const rankOrder = [
            "High Card", "One Pair", "Two Pairs", "Three of a Kind",
            "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"
        ];

        if (rankOrder.indexOf(playerRank) > rankOrder.indexOf(opponentRank)) {
            winner = "You won!";
            won = true;
        } else if (rankOrder.indexOf(playerRank) < rankOrder.indexOf(opponentRank)) {
            winner = "You lost!";
        }

        updateBalance(won ? amount * 2 : 0, won);
        setGameResult(`${winner} (You: ${playerRank} vs Opponent: ${opponentRank})`);
    };

    return (
        <div>
            <h1>Poker</h1>
            <BetControls onBet={handleBet} />
            <h3>Your Hand:</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                {playerHand.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem" }}>
                        {card.value}{card.suit}
                    </span>
                ))}
            </div>
            <h3>Opponent's Hand:</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                {opponentHand.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem" }}>
                        {card.value}{card.suit}
                    </span>
                ))}
            </div>
            {gameResult && <h2>{gameResult}</h2>}
        </div>
    );
};

export default Poker;