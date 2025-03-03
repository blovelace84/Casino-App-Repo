import React, { useState } from "react";
import { generateReels, checkWin } from "../utils/slotsUtils";
import "./Slots.css"; // Casino-style UI

const Slots = () => {
  const [reels, setReels] = useState(["❓", "❓", "❓", "❓", "❓"]);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);

  const handleSpin = () => {
    if (bet > balance) {
      setMessage("Not enough balance!");
      return;
    }

    const newReels = generateReels();
    setReels(newReels);
    setBalance(balance - bet);

    const result = checkWin(newReels);
    if (result === "Jackpot!") {
      setBalance(balance + bet * 10); // 10x payout
    }
    setMessage(result);
  };

  return (
    <div className="slot-machine">
      <h1>🎰 Slot Machine 🎰</h1>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className="reel">{symbol}</div>
        ))}
      </div>
      <p>{message}</p>
      <div className="controls">
        <button onClick={handleSpin}>SPIN 🎲</button>
        <p>Bet: ${bet}</p>
        <p>Balance: ${balance}</p>
      </div>
    </div>
  );
};

export default Slots;
