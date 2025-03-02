import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { createDeck, evaluateHand, opponentDecision } from "../utils/pokerUtils";
import BetControls from "../components/BetControls";

const Poker = () => {
    const { updateBalance } = usePlayer();
    const [deck, setDeck] = useState(createDeck());
    const [playerHand, setPlayerHand] = useState([]); // Two hole cards
    const [opponentHand, setOpponentHand] = useState([]);
    const [communityCards, setCommunityCards] = useState([]); // Five community cards
    const [gameResult, setGameResult] = useState(null);
    const [currentBet, setCurrentBet] = useState(100);
    const [round, setRound] = useState("pre-flop");
    const [folded, setFolded] = useState(false);

    const dealHands = () => {
        let newDeck = createDeck();
        setPlayerHand(newDeck.slice(0, 2)); // Two hole cards
        setOpponentHand(newDeck.slice(2, 4)); // Two hole cards for opponent
        setCommunityCards(newDeck.slice(4, 9)); // Five community cards
        setDeck(newDeck.slice(9));
        setGameResult(null);
        setRound("pre-flop");
        setFolded(false);
    };

    const handleBet = (amount) => {
        setCurrentBet(amount);
        handleOpponentMove();
    };

    const handleOpponentMove = () => {
        const decision = opponentDecision(opponentHand, communityCards);
        if (decision === "fold") {
            setGameResult("Opponent folded! You win.");
            updateBalance(currentBet * 2, true);
            setFolded(true);
            return;
        } else if (decision === "raise") {
            setCurrentBet(currentBet + 50);
        }
        goToNextRound();
    };

    const goToNextRound = () => {
        const rounds = ["pre-flop", "flop", "turn", "river", "showdown"];
        const nextRoundIndex = rounds.indexOf(round) + 1;
        if (nextRoundIndex < rounds.length) {
            setRound(rounds[nextRoundIndex]);
        } else {
            determineWinner();
        }
    };

    const determineWinner = () => {
        const playerRank = evaluateHand(playerHand, communityCards);
        const opponentRank = evaluateHand(opponentHand, communityCards);

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
            {round !== "showdown" && !folded && <BetControls onBet={handleBet} />}
            <h3>Community Cards:</h3>
            <div>
                {communityCards.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem", margin: "5px" }}>
                        {card.value}{card.suit}
                    </span>
                ))}
            </div>
            <h3>Your Cards:</h3>
            <div>
                {playerHand.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem", margin: "5px" }}>
                        {card.value}{card.suit}
                    </span>
                ))}
            </div>
            <h3>Opponent Cards:</h3>
            <div>{folded ? <span>Opponent Folded</span> : "?? ??"}</div>
            {round === "showdown" && <button onClick={determineWinner}>Reveal Winner</button>}
            {gameResult && <h2>{gameResult}</h2>}
        </div>
    );
};

export default Poker;
