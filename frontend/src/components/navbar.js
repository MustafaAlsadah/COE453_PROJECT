import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const { is_authenticated } = useAuth();
    return (
        <nav>
            <a href="/">Home</a>
            <ul>
                {is_authenticated ? (
                <li><Link to="/logout">Logout</Link></li>
                ): (
                    <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
</>
                )}
                <li><Link to="/projects">Projects</Link></li>
            </ul>
        </nav>
    )
}
