import React, { useState } from "react";
import { useCasino } from "../Context/CasinoContext";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const generateDeck = () => {
    return suits.flatMap(suit => ranks.map(rank => ({rank, suit})));
};

const getCardValue = (card) => {
    if(["J", "Q", "K"].includes(card.rank)) return 10;
    if(card.rank === "A") return 11;
    return parseInt(card.rank);
};

const calculateHandTotal = (hand) => {
    let total = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aceCount = hand.filter(card => card.rank === "A").length;

    //Convert Aces from 11 to 1 if needed to avoid bust
    while (total > 21 && aceCount > 0){
        total -= 10;
        aceCount -= 1;
    }

    return total;
};

const BlackjackGame = () => {
    const { balance, bet, placeBet, payout } = useCasino();
    const [deck, setDeck] = useState(generateDeck());
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameResult, setGameResult] = useState("");
    const [gameActive, setGameActive] = useState(false);
  
    const shuffleDeck = () => {
      setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
    };
  
    const dealCards = () => {
      shuffleDeck();
      setPlayerHand(deck.slice(0, 2));
      setDealerHand(deck.slice(2, 4));
      setGameActive(true);
      setGameResult("");
    };
  
    const startGame = (betAmount) => {
      if (balance >= betAmount) {
        placeBet(betAmount);
        dealCards();
      } else {
        setGameResult("Not enough balance to bet!");
      }
    };
  
    const hit = () => {
      if (!gameActive) return;
  
      const newCard = deck[playerHand.length + dealerHand.length];
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);
  
      if (calculateHandTotal(newHand) > 21) {
        setGameResult("You Bust! Dealer Wins.");
        setGameActive(false);
      }
    };
  
    const stand = () => {
      if (!gameActive) return;
  
      let dealerNewHand = [...dealerHand];
      while (calculateHandTotal(dealerNewHand) < 17) {
        const newCard = deck[playerHand.length + dealerNewHand.length];
        dealerNewHand.push(newCard);
      }
      setDealerHand(dealerNewHand);
      determineWinner(dealerNewHand);
    };
  
    const determineWinner = (dealerFinalHand) => {
      const playerTotal = calculateHandTotal(playerHand);
      const dealerTotal = calculateHandTotal(dealerFinalHand);
  
      if (dealerTotal > 21 || playerTotal > dealerTotal) {
        payout(2);
        setGameResult("You Win!");
      } else if (playerTotal < dealerTotal) {
        setGameResult("Dealer Wins!");
      } else {
        payout(1);
        setGameResult("It's a Tie!");
      }
  
      setGameActive(false);
    };
  
    return (
      <div>
        <h2>Blackjack Game</h2>
        <p>Balance: ${balance}</p>
        {!gameActive && <button onClick={() => startGame(50)}>Bet $50</button>}
  
        <div>
          <h3>Your Hand ({calculateHandTotal(playerHand)}):</h3>
          {playerHand.map((card, index) => (
            <span key={index}>{card.rank}{card.suit} </span>
          ))}
        </div>
  
        <div>
          <h3>Dealer's Hand ({gameActive ? "??" : calculateHandTotal(dealerHand)}):</h3>
          {dealerHand.map((card, index) => (
            <span key={index}>{gameActive && index === 0 ? "??" : `${card.rank}${card.suit}`} </span>
          ))}
        </div>
  
        {gameActive && (
          <>
            <button onClick={hit}>Hit</button>
            <button onClick={stand}>Stand</button>
          </>
        )}
  
        <h3>{gameResult}</h3>
      </div>
    );
  };
  
  export default BlackjackGame;