import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

const BetControls = ({ onBet }) => {
    const { balance, placeBet } = usePlayer();
    const [betAmount, setBetAmount] = useState(10);

    const handleBet = () => {
        if(placeBet(betAmount)){
            onBet(betAmount);
        }else{
            alert("Not enough balance!");
        }
    };

    return(
        <div>
            <h3>Balance: ${balance}</h3>
            <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))} 
                min="10"
                max={balance}
            />
            <button onClick={handleBet}>Place Bet</button>
        </div>
    );
};

export default BetControls;