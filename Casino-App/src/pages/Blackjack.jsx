import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { createDeck, calculateTotal } from "../utils/blackjackUtils";
import BetControls from "../components/BetControls";

const Blackjack = () => {
    const { updateBalance } = usePlayer();
    const [deck, setDeck] = useState(createDeck());
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameResult, setGameResult] = useState(null);
    const [playerTurn, setPlayerTurn] = useState(false);

    const handleBet = (amount) => {
        let newDeck = createDeck();
        let newPlayerHand = [newDeck.pop(), newDeck.pop()];
        let newDealerHand = [newDeck.pop(), newDeck.pop()];

        setDeck(newDeck);
        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setGameResult(null);
        setPlayerTurn(true);
    };

    const hit = () => {
        if (!playerTurn) return;
        let newHand = [...playerHand, deck.pop()];
        setPlayerHand(newHand);
        setDeck([...deck]);

        if (calculateTotal(newHand) > 21) {
            setGameResult("Bust! You lost.");
            updateBalance(0, false);
            setPlayerTurn(false);
        }
    };

    const stand = () => {
        if (!playerTurn) return;
        setPlayerTurn(false);

        let newDealerHand = [...dealerHand];
        while (calculateTotal(newDealerHand) < 17) {
            newDealerHand.push(deck.pop());
        }
        setDealerHand(newDealerHand);

        let playerTotal = calculateTotal(playerHand);
        let dealerTotal = calculateTotal(newDealerHand);

        if (dealerTotal > 21 || playerTotal > dealerTotal) {
            setGameResult("You won!");
            updateBalance(20, true);
        } else if (playerTotal < dealerTotal) {
            setGameResult("Dealer wins.");
            updateBalance(0, false);
        } else {
            setGameResult("It's a tie.");
        }
    };

    return (
        <div>
            <h1>Blackjack</h1>
            <BetControls onBet={handleBet} />
            <div>
                <h3>Your Hand ({calculateTotal(playerHand)})</h3>
                {playerHand.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem" }}>
                        {card.value}{card.suit} 
                    </span>
                ))}
            </div>
            <div>
                <h3>Dealer's Hand ({calculateTotal(dealerHand)})</h3>
                {dealerHand.map((card, index) => (
                    <span key={index} style={{ fontSize: "1.5rem" }}>
                        {card.value}{card.suit} 
                    </span>
                ))}
            </div>
            {playerTurn && (
                <>
                    <button onClick={hit}>Hit</button>
                    <button onClick={stand}>Stand</button>
                </>
            )}
            {gameResult && <h2>{gameResult}</h2>}
        </div>
    );
};

export default Blackjack;
