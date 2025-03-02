import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Poker from "./pages/Poker";
import Blackjack from "./pages/Blackjack";
import Slots from "./pages/Slots";

function App() {
    return (
        <PlayerProvider>
            <Router basename="/">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/poker" element={<Poker />} />
                    <Route path="/blackjack" element={<Blackjack />} />
                    <Route path="/slots" element={<Slots />} />
                </Routes>
            </Router>
        </PlayerProvider>
    );
}

export default App;
