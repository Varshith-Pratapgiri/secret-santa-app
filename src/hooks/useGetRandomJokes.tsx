import { useState, useEffect, useCallback } from "react";

import type { Joke } from "../types/joke";

type JokeApiResponse = {
    setup: string;
    punchline: string;
}

const fallbackApiResponse = {
    setup: "Couldn't load the joke 😔",
    punchline: "Try refreshing",
}

export default function useGetRandomJokes(): {
    joke: Joke | null;
    isJokeLoading: boolean;
} {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isJokeLoading, setIsJokeLoading] = useState<boolean>(false);


    const fetchRandomJoke = useCallback(async (): Promise<void> => {

        setIsJokeLoading(true);

        try {
            const resp = await fetch("https://official-joke-api.appspot.com/random_joke");

            if (!resp.ok) {
                throw new Error(`HTTP error: ${resp.status}`);
            }
            const data: JokeApiResponse = await resp.json();
                
            if (data?.setup && data?.punchline) {
                setJoke(data);
            } else {
                setJoke(fallbackApiResponse);                
            }
        }
        catch (err) {
            console.error(err instanceof Error ? err.message : err);
            setJoke(fallbackApiResponse);
        }
        finally {
          setIsJokeLoading(false);
        }
    }, []);

      useEffect(() => {
          fetchRandomJoke();
        }, [fetchRandomJoke]);

    return { joke, isJokeLoading };
}