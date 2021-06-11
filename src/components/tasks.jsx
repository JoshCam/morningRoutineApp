import React from "react";
import { useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { updateScreen } from "../actions";

const Tasks = () => {
  const tasks = [
    "Wake Up",
    "Drink Water",
    "Make Bed",
    "Brush Teeth",
    "Shower",
    "commute",
  ];
  const dispatch = useDispatch();
  return (
    <div className="App">
      {tasks.map((task) => {
        return <TaskCard task={task} />;
      })}
      <button onClick={() => dispatch(updateScreen(1))}>Done</button>
    </div>
  );
};

export default Tasks;
