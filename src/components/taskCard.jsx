import React from "react";
import { useDispatch } from "react-redux";
import { addTask, posTask, time } from "../actions";

const TaskCard = (props) => {
  const dispatch = useDispatch();

  let handleClick = () => {
    dispatch(addTask({ task: props.task, length: props.time })); // Adds task to slectedTasks
    dispatch(posTask(props.task)); //Removes task from list of possible tasks
    dispatch(time(props.time)); // Adds time to the routine
  };

  return (
    <h1 onClick={() => handleClick()}>
      {props.task} - {props.time} min
    </h1>
  );
};

export default TaskCard;
