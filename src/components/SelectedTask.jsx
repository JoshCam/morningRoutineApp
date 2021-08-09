import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";

import { addTaskToPos, removeTaskFromSelected } from "../actions";

const SelectedTask = (props) => {
  const user_id = useSelector((state) => state.userInfo.user_id);
  const dispatch = useDispatch();

  let removeTaskFromDB = (task) => {
    //   Removes selected task from tasks DB
    Axios.post("http://localhost:6001/remove_task", {
      task: task.task,
      user_id,
    });
  };

  // Text colour of tasks - used to update colour on click
  // to indicate the task will/has been removed
  const [textColour, setTextColour] = useState("#0c1b33");

  return (
    <div>
      <p
        className="selectedTask"
        style={{ color: textColour }}
        onClick={() => {
          dispatch(
            addTaskToPos({ task: props.task.task, length: props.task.length })
          );
          dispatch(
            removeTaskFromSelected({
              task: props.task.task,
              length: props.task.length,
            })
          );
          removeTaskFromDB({ task: props.task.task });
          setTextColour("#ff5e5e");
        }}
      >
        {props.task.task}
      </p>
    </div>
  );
};

export default SelectedTask;
