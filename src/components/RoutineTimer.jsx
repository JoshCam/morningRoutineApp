import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SingleRoutine from "./SingleRoutine";

const RoutineTimer = () => {
  useEffect(() => {
    setInterval(() => {
      // console.log(new Date(), completeTime);
      if (new Date() > completeTime.getTime()) {
        setCurrentTask(currentTask + 1);
      }
      // console.log("CT", completeTime, "TCT", currentTask);
    }, 1000);
  }, []);
  const tasks = useSelector((state) => state.selectedTasks.arr); // Array of selected tasks and time in minutes of each
  const [currentTask, setCurrentTask] = useState(0); // current task is used to call whichever index we're on in tasks
  // const startTime = useSelector((state) => state.selectedTasks.startTime);
  const currentTime = new Date();
  const length = tasks[currentTask][1] * 60 * 1000; //length in milliseconds of the task we're currently on
  const completeTime = new Date(currentTime.getTime() + length); // the time the current task will finish
  // console.log(tasks, currentTask, tasks[currentTask], length, completeTime);
  return (
    <>
      <SingleRoutine task={tasks[currentTask][0]} completeTime={completeTime} />
    </>
  );
};

export default RoutineTimer;
