
import { useState, useEffect } from "react";
import "../App.css";

type Step = {
  title: string;
  description: string;
  image: string;
}

export default function HowItWorks() {
  const [current, setCurrent] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const steps: Step[] = [
    {
      title: "Add Participants",
      description:
        "Enter the names of everyone participating in Secret Santa.",
      image: "/slideShowImages/AddParticipants.png",
    },
    {
      title: "Generate Pairs",
      description:
        "Click generate and we’ll randomly match everyone.",
      image: "/slideShowImages/GeneratePairs.png",
    },
    {
        title: "Download the list",
        description: "Download the list and share it with your team",
        image: "/slideShowImages/downloadList.png",
    },
    {
      title: "Send Gifts",
      description:
        "Each person buys a gift for their assigned match.",
      image: "/slideShowImages/sendGifts.jpg",
    },
  ];

  useEffect(() => {
    if (current === steps.length - 1) return;

    const interval = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);

    return () => clearTimeout(interval);
  }, [current, steps.length]);

  const nextStep = () => {
    if (current < steps.length - 1) setCurrent(curr => curr+1);
  };

  const prevStep = () => {
    if (current > 0) setCurrent(curr => curr-1)
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    setTouchStart(touch.clientX);
  } 

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    setTouchEnd(touch.clientX);
  }

  const handleTouchEnd = () =>  {
    if (touchStart == null || touchEnd == null) return;

    let dist = touchStart - touchEnd;

    if (dist > 50) nextStep();
    if (dist < -50) prevStep();
  }

  return (
    <div 
    className="slideshow"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {steps.map((step, index) => (
          <div className="slide" key={index}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <div className="slide-image-wrapper">
                <img src={step.image} alt={step.title} />
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={prevStep} disabled={current === 0}>←</button>
        <button onClick={nextStep} disabled={current === steps.length-1}>→</button>
      </div>

      <div className="dots">
        {steps.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
          />
        ))}
      </div>
    </div>
  );
}