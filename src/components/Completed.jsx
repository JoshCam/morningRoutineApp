// import React from "react";
import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";

import { useDispatch } from "react-redux";
import { updateScreen } from "../actions/";

import Confetti from "react-confetti";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Completed = () => {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  return (
    <div className="completedContainer">
      <Confetti width={width} height={height} />
      <p className="heading">All Done!</p>
      <p>Well done you completed your morning routine!</p>
      <p>If you managed everything on time then you should be</p>
      <p>just getting ready to start work!</p>
      <p>Have a great day</p>

      <a href="/#" className="btn" onClick={() => dispatch(updateScreen(1))}>
        Done
      </a>
    </div>
  );
};

export default Completed;
