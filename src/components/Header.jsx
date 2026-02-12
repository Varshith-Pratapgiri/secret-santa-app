import "../App.css";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
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