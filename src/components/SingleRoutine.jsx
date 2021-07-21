import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

var timer = null;

const SingleRoutine = (props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let bgColors = [
      "#E3EFF2",
      "#D9E9D8",
      "#FAF0CA",
      "#F8DDEB",
      "#F5F5F5",
      "#E6CBFF",
      "#A0FEF4",
      "#FFDEB9",
      "#ffb3ba",
      "#baffc9",
      "#ffdfba",
    ];
    // Changes background colour at random for each task
    document.body.style.backgroundColor =
      bgColors[Math.floor(Math.random() * bgColors.length)];
  }, [props.task]);

  useEffect(() => {
    // sets time left every 250ms for a smooth counter
    timer = setInterval(() => {
      setTimeLeft(props.completeTime.getTime() - Date.now());
    }, 250);
    // Cleans up the useEffect
    return function cleanup() {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // sets time left every 250ms for a smooth counter
    clearTimeout(timer);
    timer = setInterval(() => {
      setTimeLeft(props.completeTime.getTime() - Date.now());
    }, 250);
  });

  return (
    <div className="singleTaskContainer">
      <div className="singleTask">
        <p>{props.task}</p>
        <p className="timer">
          {/* formats timer into H:M:S - can change to M:S if i want */}
          {moment
            .utc(moment.duration(timeLeft / 1000, "seconds").asMilliseconds())
            .format("HH:mm:ss")}
        </p>
      </div>
    </div>
  );
};

export default SingleRoutine;
