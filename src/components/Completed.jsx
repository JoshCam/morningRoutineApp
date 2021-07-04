import React from "react";
import { useDispatch } from "react-redux";
import { updateScreen } from "../actions/";

const Completed = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Well done you completed your morning routine!</p>
      <p>If you managed everything on time then you should be</p>
      <p>just getting ready to start work!</p>
      <p>Have a great day</p>

      <a className="btn" onClick={() => dispatch(updateScreen(1))}>
        Done
      </a>
    </div>
  );
};

export default Completed;
