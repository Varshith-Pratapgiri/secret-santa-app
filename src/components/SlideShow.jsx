// import addParticipantsImg from "../assets/slideShowImages/AddParticipants.png";
// import generatePairsImg from "../assets/slideShowImages/GeneratePairs.png";
// import downloadListImg from "../assets/slideShowImages/downloadList.png";
// import sendGiftsImg from "../assets/slideShowImages/sendGifts.jpg";

import { useState, useEffect } from "react";
import "../App.css";

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);

  const steps = [
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

  return (
    <div className="slideshow">
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