import { useState } from "react";

export const useBonuses = () => {
    const [bonus, setBonus] = useState(null);

    const triggerBonus = () => {
        const chance = Math.random();
        if(chance < 0.1){
            setBonus("Free Spin 🎉");
            return "Free Spin";
        }else if(chance < 0.2){
            setBonus("2x Multiplier! 🔥");
            return "multiplier";
        }
        setBonus(null);
        return null;
    };
    return { bonus, triggerBonus};
};