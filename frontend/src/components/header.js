import { Link } from "react-router-dom";
import Navbar from "./navbar";

export default function Header() {
    return (
        <header>
            <Navbar /> 
            <h1>The #1 Platform For Finding Team-mates</h1>
            <p>Find the perfect teammate for your new sideproject!</p>
            <Link to="/register">
                <b>Get started</b>
            </Link>
            <br />
            <img
                src="https://t3.ftcdn.net/jpg/06/15/48/68/360_F_615486892_aozUyTfkyojEl6WJ2Gq8GtTvLLOTmHRV.jpg"
                alt="Cat group selfie"
            />
        </header>
    )
}