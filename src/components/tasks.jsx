import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { updateScreen, removeCommute } from "../actions";

const Tasks = () => {
  const posTasks = useSelector((state) => state.posTasks);
  const duration = useSelector((state) => state.userInfo.duration);
  const dispatch = useDispatch();

  let travelTime;
  if (duration > 0) {
    travelTime = duration / 60;
    // console.log("commuting");
  } else {
    dispatch(removeCommute());
    // console.log("not commuting");
  }

  return (
    <div className="tasksContainer">
      <p className="heading">Choose your routine</p>
      {posTasks.map((task, index) => {
        return (
          <TaskCard
            key={index}
            task={task.task}
            time={
              task.task === "Commute" ? Math.round(travelTime) : task.length
            }
          />
        );
      })}
      <a
        href="/#"
        className="btn doneTasks"
        onClick={() => dispatch(updateScreen(1))}
      >
        Done
      </a>
    </div>
  );
};

export default Tasks;
