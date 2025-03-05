import React, { useState } from "react";
import { useSlots } from "../hooks/useSlots";
import { useAudio } from "../hooks/useAudio";
import spinSound from "../assets/spin.m4a";
import winSound from "../assets/win.m4a";
import "../pages/Slots.css"; 

const Slots = () => {
  const { reels, message, balance, bet, setBet, spin } = useSlots();
  const playSpinSound = useAudio(spinSound);
  const playWinSound = useAudio(winSound);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if(balance < bet) {
      alert("Not enough balance! 💰");
      return;
    }
    playSpinSound();
    setIsSpinning(true);  // Start animation

    setTimeout(() => {
      spin();
      setIsSpinning(false);  // Stop animation after spin completes
      playWinSound();
    }, 2000); // 2 seconds spin duration
  };

  return (
    <div className="slot-machine">
      <h1>🎰 Slot Machine 🎰</h1>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className={`reel ${isSpinning ? "spinning" : ""}`}>
            {isSpinning ? "🎰" : symbol} 
          </div>
        ))}
      </div>
      <p className={message.includes("JACKPOT") ? "jackpot" : ""}>{message}</p>
      {/* Betting Controls */}
      <div className="bet-controls">
        <button onClick={() => setBet((prev) => Math.max(10, prev - 10))} disabled={isSpinning}>
          ➖ Lower Bet
        </button>
        <span className="bet-amount">Bet: ${bet}</span>
        <button onClick={() => setBet((prev) => Math.min(balance, prev + 10))} disabled={isSpinning}>
          ➕ Increase Bet
        </button>
      </div>
      <button onClick={handleSpin} disabled={isSpinning}>SPIN 🎲</button>
    </div>
  );
};

export default Slots;