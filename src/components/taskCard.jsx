import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions";

const TaskCard = (props) => {
  const dispatch = useDispatch();
  return <h1 onClick={() => dispatch(addTask(props.task))}>{props.task}</h1>;
};

export default TaskCard;
