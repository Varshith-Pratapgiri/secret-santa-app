import "../App.css";
import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                <Link to="/" className="logo">
                    🎁
                </Link>
            </div>
            </div>
        </header>
    );
}