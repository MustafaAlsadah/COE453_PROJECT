import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <a href="/">Home</a>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
        </nav>
    )
}