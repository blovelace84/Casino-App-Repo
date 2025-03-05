// src/utils/slotsUtils.js

const symbols = ["🍒", "7️⃣", "🔔", "🍋", "💎", "⭐", "🍉"];

// Function to generate 5 random slot reels
export function generateReels() {
  return Array.from({ length: 5 }, () =>
    symbols[Math.floor(Math.random() * symbols.length)]
  );
}

// Function to check win conditions
export function checkWin(reels) {
  const allSame = reels.every((symbol) => symbol === reels[0]); // All symbols match
  const hasJackpot = reels.includes("7️⃣") && reels.includes("💎") && reels.includes("⭐"); // Jackpot combo
  const twoPairs = reels.filter((item, index, arr) => arr.indexOf(item) !== index).length >= 2; // At least two pairs
  
  if (allSame) return "🎉 JACKPOT! You won big! 🎉";
  if (hasJackpot) return "🔥 BONUS WIN! 🔥";
  if (twoPairs) return "✨ Small Win! ✨";
  
  return "❌ Try Again!";
}
