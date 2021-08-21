import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { addTask, posTask } from "../actions";

const TaskCard = (props) => {
  const user_id = useSelector((state) => state.userInfo.user_id);
  const dispatch = useDispatch();

  const [textColour, setTextColour] = useState("#0c1b33");

  let handleClick = () => {
    dispatch(addTask({ task: props.task, length: props.time })); // Adds task to selectedTasks
    dispatch(posTask(props.task)); //Removes task from list of possible tasks
    setTextColour("#3F7C8D"); //Change text colour to make clear task is selected
    axios.post("https://morning-routine-jc.herokuapp.com/add_task", {
      //Sends selected tasks to database
      user_id: user_id,
      task: props.task,
      time: props.time,
    });
  };

  return (
    // component that  displays an individual task
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
