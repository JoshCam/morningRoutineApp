import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { updateScreen } from "../actions";

const Tasks = () => {
  const tasks = useSelector((state) => state.posTasks);
  const duration = useSelector((state) => state.userInfo.duration);
  const dispatch = useDispatch();

  let travelTime;
  if (duration) {
    travelTime = duration / 60; // to get minutes (will have to implement getting hours as well)
  } else {
    // remove the commute array
  }

  // Possibly add an if statement/create an action + reducer to remove commute if the user never selects it in info screen

  return (
    <div className="App">
      {tasks.map((task) => {
        return (
          <TaskCard
            task={task.task}
            time={
              task.task === "Commute" ? Math.round(travelTime) : task.length
            }
          />
        );
      })}
      <button onClick={() => dispatch(updateScreen(1))}>Done</button>
    </div>
  );
};

export default Tasks;
