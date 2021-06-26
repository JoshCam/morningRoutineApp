import React from "react";
import { useState, useEffect } from "react";

const SingleRoutine = (props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(props.completeTime.getTime() - Date.now());
    }, 250);
  }, []);

  return (
    <div>
      <p>{props.task}</p>
      <p>{Math.round(timeLeft / 1000)}</p>
      <p>{props.completeTime.getTime()}</p>
    </div>
  );
};

export default SingleRoutine;
