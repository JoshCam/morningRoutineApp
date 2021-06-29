import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

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
      <p>
        {moment
          .utc(moment.duration(timeLeft / 1000, "seconds").asMilliseconds())
          .format("HH:mm:ss")}
      </p>
    </div>
  );
};

export default SingleRoutine;
