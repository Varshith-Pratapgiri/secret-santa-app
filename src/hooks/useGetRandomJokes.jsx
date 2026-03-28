import { useState, useEffect } from "react";

export default function useGetRandomJokes() {
    const [joke, setJoke] = useState(null);
    const [isJokeLoading, setIsJokeLoading] = useState(false);

    useEffect(() => {

        const fetchRandomJoke = async () => {

            setIsJokeLoading(true);

            try {
                const resp = await fetch("https://official-joke-api.appspot.com/random_joke");

                console.log(resp.statusText)
                if (!resp.ok) {
                    throw new Error(`HTTP error: ${resp.status}`);
                }
                const data = await resp.json();
                
                if (data && data.setup) {
                    const jokeData = {
                        setup: data.setup,
                        punchline: data.punchline,
                    }

                    setJoke(jokeData);
                
                } else {
                    setJoke({
                        setup: "No jokes available 😅",
                        punchline: "Try refreshing"
                    });
                }
            }
            catch (err) {
                console.error(err);
                setJoke({
                    setup : "Couldn't load the joke 😔",
                    punchline : "Try refreshing"
                });
            }
            finally {
                setIsJokeLoading(false);
            }
        }
        fetchRandomJoke();
    }, []);

    return { joke, isJokeLoading };
}