import React, { useState } from "react";

const Slots = () => {
  const [reels, setReels] = useState(["🍒", "🍋", "🍊"]); // Initial reel symbols
  const [balance, setBalance] = useState(100); // Player's starting balance
  const [bet, setBet] = useState(10); // Default bet amount
  const [isSpinning, setIsSpinning] = useState(false); // State to track spinning
  const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "🔔"]; // Slot machine symbols

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
      const randomReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(randomReels);
    }, 100); // Change symbols every 100ms

    // Stop spinning after 2 seconds and show the final result
    setTimeout(() => {
      clearInterval(spinInterval);

      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(finalReels);
      setIsSpinning(false);

      // Check for a win (all symbols match)
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        const winnings = bet * 5; // Example: 5x payout for a win
        setBalance(balance - bet + winnings);
        alert(`You win! You earned ${winnings} credits!`);
      }
    }, 2000); // Spin for 2 seconds
  };

  // Reset the game state
  const resetGame = () => {
    setReels(["🍒", "🍋", "🍊"]); // Reset reels to initial symbols
    setBalance(100); // Reset balance to initial value
    setBet(10); // Reset bet to default value
    setIsSpinning(false); // Ensure spinning is stopped
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to the Slots!</h1>
      <p>Try your luck and spin the reels!</p>
      <p>
        <strong>Balance:</strong> {balance} credits
      </p>
      <div>
        <label>
          <strong>Bet Amount:</strong>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            min="1"
            max={balance}
            disabled={isSpinning} // Disable input while spinning
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontSize: "1rem",
              width: "80px",
            }}
          />
        </label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
          fontSize: "2rem",
          border: "2px solid black",
          padding: "10px",
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#f8f8f8",
        }}
      >
        {reels.map((symbol, index) => (
          <span key={index} style={{ margin: "0 10px" }}>
            {symbol}
          </span>
        ))}
      </div>
      <button
        onClick={spinReels}
        disabled={isSpinning} // Disable button while spinning
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: isSpinning ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isSpinning ? "not-allowed" : "pointer",
          marginRight: "10px",
        }}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      <button
        onClick={resetGame}
        disabled={isSpinning} // Disable reset while spinning
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isSpinning ? "not-allowed" : "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Slots;