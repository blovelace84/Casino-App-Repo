import { createContext, useContext, useState } from "react";

const CasinoContext = createContext();

export const CasinoProvider = ({ children }) => {
    const [balance, setBalance] = useState(1000);

    const placeBet = (amount) => {
        if(amount > 0 && amount <= balance){
            setBalance(prev => prev - amount);
        }
    };

    const payout = (multiplier) => {
        setBalance(prev => prev + multiplier);
    };
    return(
        <CasinoContext.Provider value={{ balance, placeBet, payout}}>
            {children}
        </CasinoContext.Provider>
    );
};

export const useCasino = () => useContext(CasinoContext);