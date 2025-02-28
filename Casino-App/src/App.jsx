import React from "react";
import PokerGame from "./Components/PokerGame";
import BlackjackGame from "./Components/BlackJackGame";
import SlotGame from "./Components/SlotsGame";

function App() {
  return (
   <div>
      <h1>Jackpot Royale</h1>
      <PokerGame />
      <BlackjackGame />
      <SlotGame />
   </div>
  )
}

export default App
