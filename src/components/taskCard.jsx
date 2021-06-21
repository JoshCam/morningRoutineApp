import React from "react";
import { useDispatch } from "react-redux";
import { addTask, posTask, time } from "../actions";

const TaskCard = (props) => {
  const dispatch = useDispatch();

  let handleClick = () => {
    dispatch(addTask(props.task));
    dispatch(posTask(props.task));
    dispatch(time(props.time));
  };

  return (
    <h1 onClick={() => handleClick()}>
      {props.task} - {props.time} min
    </h1>
  );
};

export default TaskCard;
