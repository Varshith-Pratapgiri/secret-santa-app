import "../App.css";
import {useNavigate} from "react-router-dom";
import SlideShow from "../components/SlideShow";

export default function HomePage() {
    const navigate = useNavigate();

    return(
        <section className="home-page">
            <h1>🎁 Secret Santa Generator</h1>
            <p>Enter your employee/student list and generate a secret santa algorithm</p>
            <button onClick={() => navigate("/enter-list")}>Add list</button>

            <section className="how-it-works">
                <h3>How it works?</h3>
                <SlideShow />
            </section>
        </section>
    );
}