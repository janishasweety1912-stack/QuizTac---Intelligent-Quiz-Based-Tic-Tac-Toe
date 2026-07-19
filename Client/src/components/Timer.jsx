import React, { useEffect, useState } from "react";

function Timer({ onTimeUp, duration }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration); // reset when new question comes
  }, [duration]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <h2 className="timer">
      ⏱ Time: {time}s
    </h2>
  );
}

export default Timer;
