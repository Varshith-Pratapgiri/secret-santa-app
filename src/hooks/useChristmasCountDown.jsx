import { useState, useEffect } from "react";

export default function useChristmasCountDown() {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isLoading, setIsCountDownLoading] = useState(false);

    useEffect(() => {
        const fetchChristmasCountDown = async () => {
            try {
                setIsCountDownLoading(true);

                const cachedCountDown = localStorage.getItem("cachedCountDown");

                if (cachedCountDown) {
                    let parsed = JSON.parse(cachedCountDown);
                    let isTrue = Date.now() - parsed.timeStamp < 60000;

                    if (isTrue) {
                        setTimeLeft(parsed.countDown);
                        setIsCountDownLoading(false);
                        return;
                    }
                }
                
                const resp = await fetch ("https://christmascountdown.live/api/timeleft/total");
                const data = await resp.json();

                const countDownData = {
                    countDown : data,
                    timeStamp : Date.now()
                }

                setTimeLeft(data);
                
                localStorage.setItem("cachedCountDown", JSON.stringify(countDownData));
                
            } catch (err) {
                console.error(err);
            }
            finally {
                setIsCountDownLoading(false);
            }
        }
        fetchChristmasCountDown();
    }, []);
    return { timeLeft, setIsCountDownLoading };
}