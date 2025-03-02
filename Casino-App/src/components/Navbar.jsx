import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/poker">Poker</Link></li>
                <li><Link to="/blackjack">Blackjack</Link></li>
                <li><Link to="/slots">Slots</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;