import React, { useState } from "react";
import { generateReels, checkWin } from "../utils/slotsUtils";
import './Slots.css';

const Slots = () => {
  const [reels, setReels] = useState(["🍒", "🍋", "🍊"]); // Initial reel symbols
  const [balance, setBalance] = useState(100); // Player's starting balance
  const [bet, setBet] = useState(10); // Default bet amount
  const [isSpinning, setIsSpinning] = useState(false); // State to track spinning

  const spinReels = () => {
    if (bet > balance) {
      alert("Insufficient balance to place the bet!");
      return;
    }

    // Deduct the bet amount from the balance
    setBalance(balance - bet);

    // Start spinning
    setIsSpinning(true);

    // Temporary spinning effect
    const spinInterval = setInterval(() => {
      setReels(generateReels()); // Use generateReels to create random reels
    }, 100); // Change symbols every 100ms

    // Stop spinning after 2 seconds and show the final result
    setTimeout(() => {
      clearInterval(spinInterval);

      const finalReels = generateReels(); // Generate final reels
      setReels(finalReels);
      setIsSpinning(false);

      // Check for a win using checkWin
      const result = checkWin(finalReels);
      alert(result);

      // Update balance based on win condition
      if (result.includes("JACKPOT")) {
        setBalance(balance - bet + bet * 10); // Example: 10x payout for jackpot
      } else if (result.includes("BONUS WIN")) {
        setBalance(balance - bet + bet * 5); // Example: 5x payout for bonus win
      } else if (result.includes("Small Win")) {
        setBalance(balance - bet + bet * 2); // Example: 2x payout for small win
      }
    }, 2000); // Spin for 2 seconds
  };

  const resetGame = () => {
    setReels(["🍒", "🍋", "🍊"]); // Reset reels to initial symbols
    setBalance(100); // Reset balance to initial value
    setBet(10); // Reset bet to default value
    setIsSpinning(false); // Ensure spinning is stopped
  };

  return (
    <div className="slots-container">
      <h1 className="slots-title">Welcome to the Slots!</h1>
      <p className="slots-balance">
        <strong>Balance:</strong> {balance} credits
      </p>
      <div className="slots-bet">
        <label>
          <strong>Bet Amount:</strong>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            min="1"
            max={balance}
            disabled={isSpinning} // Disable input while spinning
          />
        </label>
      </div>
      <div className="slots-reels">
        {reels.map((symbol, index) => (
          <span key={index}>{symbol}</span>
        ))}
      </div>
      <button
        className="slots-button spin"
        onClick={spinReels}
        disabled={isSpinning} // Disable button while spinning
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      <button
        className="slots-button reset"
        onClick={resetGame}
        disabled={isSpinning} // Disable reset while spinning
      >
        Reset
      </button>
    </div>
  );
};

export default Slots;