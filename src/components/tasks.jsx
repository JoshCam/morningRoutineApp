import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { updateScreen } from "../actions";

const Tasks = () => {
  const tasks = useSelector((state) => state.posTasks);
  const commute = useSelector((state) => state.userInfo.commute);
  const dispatch = useDispatch();

  if (commute) {
    // import travel time into the commute array
  } else {
    // remove the commute array
  }

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
