import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { createDeck, evaluateHand, opponentDecision } from "../utils/pokerUtils";
import BetControls from "../components/BetControls";

const Poker = () => {
    const { updateBalance } = usePlayer();
    const [deck, setDeck] = useState(createDeck());
    const [playerHand, setPlayerHand] = useState([]);
    const [opponentHand, setOpponentHand] = useState([]);
    const [gameResult, setGameResult] = useState(null);
    const [currentBet, setCurrentBet] = useState(100);
    const [selectedCards, setSelectedCards] = useState([]);
    const [round, setRound] = useState("pre-flop");

    const dealHands = () => {
        let newDeck = createDeck();
        setPlayerHand(newDeck.slice(0, 5));
        setOpponentHand(newDeck.slice(5, 10));
        setDeck(newDeck.slice(10));
        setGameResult(null);
        setRound("pre-flop");
    };

    const toggleCardSelection = (index) => {
        setSelectedCards(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const swapCards = () => {
        if (selectedCards.length === 0) return;
        const newDeck = [...deck];
        const newHand = playerHand.map((card, index) =>
            selectedCards.includes(index) ? newDeck.pop() : card
        );
        setPlayerHand(newHand);
        setDeck(newDeck);
        setSelectedCards([]);
        setRound("betting");
    };

    const handleBet = (amount) => {
        setCurrentBet(amount);
        handleOpponentMove();
    };

    const handleOpponentMove = () => {
        const decision = opponentDecision(opponentHand);
        if (decision === "fold") {
            setGameResult("Opponent folded! You win.");
            updateBalance(currentBet * 2, true);
            return;
        } else if (decision === "raise") {
            setCurrentBet(currentBet + 50);
        }
        setRound("showdown");
    };

    const determineWinner = () => {
        const playerRank = evaluateHand(playerHand);
        const opponentRank = evaluateHand(opponentHand);

        const rankOrder = [
            "High Card", "One Pair", "Two Pairs", "Three of a Kind",
            "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"
        ];

        let winner = "It's a tie!";
        let won = false;

        if (rankOrder.indexOf(playerRank) > rankOrder.indexOf(opponentRank)) {
            winner = "You won!";
            won = true;
        } else if (rankOrder.indexOf(playerRank) < rankOrder.indexOf(opponentRank)) {
            winner = "You lost!";
        }

        updateBalance(won ? currentBet * 2 : 0, won);
        setGameResult(`${winner} (You: ${playerRank} vs Opponent: ${opponentRank})`);
    };

    return (
        <div>
            <h1>Poker</h1>
            <button onClick={dealHands}>Deal Hands</button>
            {round === "pre-flop" && (
                <>
                    <h3>Select Cards to Swap:</h3>
                    {playerHand.map((card, index) => (
                        <span 
                            key={index} 
                            onClick={() => toggleCardSelection(index)}
                            style={{ 
                                fontSize: "1.5rem", 
                                cursor: "pointer",
                                border: selectedCards.includes(index) ? "2px solid red" : "none"
                            }}
                        >
                            {card.value}{card.suit}
                        </span>
                    ))}
                    <button onClick={swapCards}>Swap Selected Cards</button>
                </>
            )}
            {round === "betting" && <BetControls onBet={handleBet} />}
            {round === "showdown" && <button onClick={determineWinner}>Reveal Winner</button>}
            {gameResult && <h2>{gameResult}</h2>}
        </div>
    );
};

export default Poker;