import { useState, useEffect, useCallback } from "react";

import type { Countdown } from "../types/countdown";

type CachedCountDown = {
    countDown: Countdown;
    timeStamp: number;
}

export default function useChristmasCountDown() : {
    timeLeft: Countdown | null,
    isCountDownLoading: boolean,
} {
    const [timeLeft, setTimeLeft] = useState<Countdown | null>(null);
    const [isCountDownLoading, setIsCountDownLoading] = useState<boolean>(false);

        const fetchChristmasCountDown = useCallback(async (): Promise<void> => {
            try {
                setIsCountDownLoading(true);

                const cachedCountDown = localStorage.getItem("cachedCountDown");

                if (cachedCountDown) {
                    let parsed: CachedCountDown = JSON.parse(cachedCountDown);
                    let isTrue = Date.now() - parsed.timeStamp < 60000;

                    if (isTrue) {
                        setTimeLeft(parsed.countDown);
                        return;
                    }
                }
                
                const resp = await fetch ("https://christmascountdown.live/api/timeleft/total");

                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                const data: Countdown = await resp.json();

                const countDownData = {
                    countDown : data,
                    timeStamp : Date.now()
                }

                setTimeLeft(data);
                
                localStorage.setItem("cachedCountDown", JSON.stringify(countDownData));
                
            } catch (err) {
                console.error(err instanceof Error? err.message : err);
            }
            finally {
                setIsCountDownLoading(false);
            }
        }, []);

        useEffect(() => {
            fetchChristmasCountDown();
        }, [fetchChristmasCountDown]);

    return { timeLeft, isCountDownLoading };
}