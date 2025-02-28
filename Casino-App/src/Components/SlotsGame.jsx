import React, { useState } from "react";
import { useCasino } from "../Context/CasinoContext";
import "./SlotsGame.css";

const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "🔔", "7️⃣"]; //slot symbols

const SlotGame = () => {
    const { balance, placeBet, payout } = useCasino();
    const [reels, setReels] = useState(["❓", "❓", "❓"]);
    const [spinning, setSpinning] = useState(false);
    const [gameResult, setGameResult] = useState("");

    const spinReels = () => {
        if(balance < 50){
            setGameResult("Not enough balance!");
            return;
        }
        placeBet(50);
        setSpinning(true);
        setGameResult("");

        setTimeout(() => {
            const newReels = [
                symbols[Math.floor(Math.random() * symbols.length)],
                symbols[Math.floor(Math.random() * symbols.length)],
                symbols[Math.floor(Math.random() * symbols.length)],
            ];
            setReels(newReels);
            setSpinning(false);
            calculatePayout(newReels);
        }, 1500);
    };
    const calculatePayout = (newReels) => {
        const [first, second, third] = newReels;

        if(first === second && second === third){
            let multiplier = first === "7️⃣" ? 10 : 5; //Higher payout for 7
            payout(multiplier);
            setGameResult(`Jackpot! you won ${multiplier * 50}!🎉`);
        }else if (first === second || second === third || first === third){
            payout(2);
            setGameResult("Small Win! You got a 2x payout!");
        }else{
            setGameResult("Try again!");
        }
    };
    return(
        <div className="slots-container">
            <h2>🎰 Test Your Luck on These Slots!!</h2>
            <p>Balance: ${balance}</p>
            <div className={`reels ${spinning ? "spinning" : ""}`}>
                {reels.map((Symbol, index) => (
                    <span key={index} className="slot">{Symbol}</span>
                ))}
            </div>
            <button onClick={spinReels} disabled={spinning}>Spin ($50)</button>
            <h3>{gameResult}</h3>    
        </div>
    );
};

export default SlotGame;