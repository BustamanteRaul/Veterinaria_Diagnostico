import "./nav.css";
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li><NavLink to="/" end >Home</NavLink></li>
                <li><NavLink to="/owners" >Owners</NavLink></li>
            </ul>
        </nav>
    );
}