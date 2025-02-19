import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ timeLimit, onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit); // Reset timer on question change
  }, [resetTrigger, timeLimit]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      
      onTimeUp && onTimeUp();
    }
  }, [timeLeft]);

  const percentage = (timeLeft / timeLimit) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-24 h-24">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: `#3b82f6`,
          textColor: "#1e3a8a",
          trailColor: "#dbeafe",
        })}
      />
    </div>
  );
};

export default Timer;
