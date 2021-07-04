import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, posTask, time } from "../actions";

const TaskCard = (props) => {
  const dispatch = useDispatch();

  const [textColour, setTextColour] = useState("#0c1b33");

  let handleClick = () => {
    dispatch(addTask({ task: props.task, length: props.time })); // Adds task to slectedTasks
    dispatch(posTask(props.task)); //Removes task from list of possible tasks
    dispatch(time(props.time)); // Adds time to the routine
    setTextColour("#3F7C8D"); //Chnage text colour to make ob
  };

  return (
    <p
      style={{ color: textColour }}
      className="posTask"
      onClick={() => handleClick()}
    >
      {props.task} - {props.time} min
    </p>
  );
};

export default TaskCard;
