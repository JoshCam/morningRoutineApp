import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { updateScreen, posTask } from "../actions";

const Tasks = () => {
  const tasks = useSelector((state) => state.posTasks);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {tasks.map((task) => {
        return <TaskCard task={task[0]} time={task[1]} />;
      })}
      <button onClick={() => dispatch(updateScreen(1))}>Done</button>
    </div>
  );
};

export default Tasks;
