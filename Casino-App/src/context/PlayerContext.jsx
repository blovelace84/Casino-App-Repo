import { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [balance, setBalance] = useState(1000);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const placeBet = (amount) => {
        if(amount > balance) return false;
        setBalance(balance - amount);
        return true;
    };

    const updateBalance = (amount, won) => {
        setBalance(balance + amount);
        if(won){
            setWins(wins + 1);
        }else{
            setLosses(losses + 1);
        }
    };

   return (
        <PlayerContext.Provider value={{ balance, wins, losses, placeBet, updateBalance}}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);