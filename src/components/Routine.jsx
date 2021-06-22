import React from "react";
import { useDispatch } from "react-redux";
import { updateScreen } from "../actions/";

const Routine = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Lets start getting ready!</h1>
      <p>Just hit the button below and your routine will start</p>
      <button onClick={() => dispatch(updateScreen(4))}>Start</button>
    </>
  );
};

export default Routine;
