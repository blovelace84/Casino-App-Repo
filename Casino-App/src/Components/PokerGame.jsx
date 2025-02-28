import React, { useState } from "react";
import { useCasino } from "../Context/CasinoContext";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const generateDeck = () => {
  return suits.flatMap(suit => ranks.map(rank => ({ rank, suit })));
};

const getHandValue = (hand) => {
  // Simple value system, can be improved for real poker rules
  return hand.reduce((sum, card) => sum + ranks.indexOf(card.rank) + 2, 0);
};

const PokerGame = () => {
  const { balance, bet, placeBet, payout } = useCasino();
  const [deck, setDeck] = useState(generateDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameResult, setGameResult] = useState("");

  const shuffleDeck = () => {
    setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
  };

  const dealCards = () => {
    shuffleDeck();
    setPlayerHand(deck.slice(0, 2));
    setDealerHand(deck.slice(2, 4));
  };

  const startGame = (betAmount) => {
    if (balance >= betAmount) {
      placeBet(betAmount);
      dealCards();
      determineWinner();
    } else {
      setGameResult("Not enough balance to bet!");
    }
  };

  const determineWinner = () => {
    const playerValue = getHandValue(playerHand);
    const dealerValue = getHandValue(dealerHand);

    if (playerValue > dealerValue) {
      payout(2);
      setGameResult("You Win!");
    } else if (playerValue < dealerValue) {
      setGameResult("Dealer Wins!");
    } else {
      payout(1);
      setGameResult("It's a Tie!");
    }
  };

  return (
    <div>
      <h2>Poker Game</h2>
      <p>Balance: ${balance}</p>
      <button onClick={() => startGame(50)}>Bet $50</button>
      <div>
        <h3>Your Hand:</h3>
        {playerHand.map((card, index) => (
          <span key={index}>{card.rank}{card.suit} </span>
        ))}
      </div>
      <div>
        <h3>Dealer's Hand:</h3>
        {dealerHand.map((card, index) => (
          <span key={index}>{card.rank}{card.suit} </span>
        ))}
      </div>
      <h3>{gameResult}</h3>
    </div>
  );
};

export default PokerGame;
