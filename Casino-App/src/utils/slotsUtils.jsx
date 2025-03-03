// src/utils/slotsUtils.js

const symbols = ["🍒", "7️⃣", "🔔", "🍋", "💎", "⭐", "🍉"];

export function generateReels() {
  return Array.from({ length: 5 }, () => 
    symbols[Math.floor(Math.random() * symbols.length)]
  );
}

export function checkWin(reels) {
  // Basic win condition: all reels match
  const allSame = reels.every((symbol) => symbol === reels[0]);
  return allSame ? "Jackpot!" : "Try Again!";
}
