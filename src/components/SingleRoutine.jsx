import React from "react";
import { useState, useEffect } from "react";

var timer = null;

const SingleRoutine = (props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    timer = setInterval(() => {
      setTimeLeft(props.completeTime.getTime() - Date.now());
    }, 250);
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    timer = setInterval(() => {
      setTimeLeft(props.completeTime.getTime() - Date.now());
    }, 250);
  });

  return (
    <div>
      <p>{props.task}</p>
      <p>{Math.round(timeLeft / 1000)}</p>
    </div>
  );
};

export default SingleRoutine;
