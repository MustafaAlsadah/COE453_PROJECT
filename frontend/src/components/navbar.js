import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <a href="/">Home</a>
            <ul>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
        </nav>
    )
}
