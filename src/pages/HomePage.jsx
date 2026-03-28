import "../App.css";
import {useNavigate} from "react-router-dom";

import SlideShow from "../components/SlideShow";

import useChristmasCountDown from "../hooks/useChristmasCountDown";
import useGetRandomJokes from "../hooks/useGetRandomJokes";

export default function HomePage() {
    const navigate = useNavigate();
    const { timeLeft, isCountDownLoading } = useChristmasCountDown();
    const { joke, isJokeLoading } = useGetRandomJokes();


    return(
        <section className="home-page">
            
            <div className="hero">
                <h1>🎁 Secret Santa Generator</h1>
                <p>100% random & fair</p>
                <p>Enter your employee/student list and generate a secret santa algorithm</p>
                <p>Organize gift exchanges in seconds — no repeats, no self-assignments.</p>
            </div>

            <section className="nudge-1">
                {isCountDownLoading ? (
                    <p>loading...</p>
                ) : (
                    <p>Christmas in {" "}
                    {timeLeft 
                    ? `${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds` 
                    : "..."}
                    </p>
                )}
            </section>


            <section className="nudge-2">
                {isJokeLoading ? (
                    <p>loading joke...</p>
                ) : joke ? (
                    <div>
                        <p>{joke.setup}</p>
                        <strong>{joke.punchline}</strong>
                    </div>
                ) : (
                    <p>No jokes available</p>
                )}
            </section>

            <section className="features">
                <h2>Features</h2>
                <ul>
                    <li>No self-assignment</li>
                    <li>No duplicate pairs</li>
                    <li>Instant generation</li>
                    <li>Download results</li>
                    <li>Privacy-friendly (no data stored)</li>
                </ul>
            </section>

            <section className="final-cta">
              <h2>Ready to start?</h2>
              <button onClick={() => navigate("/enter-list")}>
                Generate Secret Santa
              </button>
            </section>

            <section className="use-cases">
                <h2>Perfect for:</h2>
                <ul>
                    <li>Office teams </li>
                    <li>College groups</li>
                    <li>Friends & family</li>
                    <li>Remote teams</li>
                </ul>
            </section>

            <section className="how-it-works">
                <h2>How it works?</h2>
                <SlideShow />
            </section>


        </section>
    );
}