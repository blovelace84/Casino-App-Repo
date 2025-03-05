import { useState } from "react";
import { generateReels, checkWin } from "../utils/slotsUtils";

export const useSlots = () => {
  const [reels, setReels] = useState(generateReels());
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(50);

  const spin = () => {
    if (balance < bet) {
      setMessage("Not enough balance! 💰");
      return;
    }

    setBalance((prev) => prev - bet);
    const newReels = generateReels();
    setReels(newReels);
    const resultMessage = checkWin(newReels);

    if (resultMessage.includes("WIN") || resultMessage.includes("JACKPOT")) {
      setBalance((prev) => prev + bet * 5); // Reward for wins
    }

    setMessage(resultMessage);
  };

  return { reels, message, balance, bet, setBet, spin };
};
