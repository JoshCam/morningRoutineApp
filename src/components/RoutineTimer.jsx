// import React from "react";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import SingleRoutine from "./SingleRoutine";

// const RoutineTimer = () => {
//   const tasks = useSelector((state) => state.selectedTasks.arr);
//   const [currentTask, setCurrentTask] = useState(0);
//   const [length, setLength] = useState(tasks[currentTask][1] * 60 * 1000);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [completeTime, setCompleteTime] = useState(
//     new Date(currentTime.getTime() + length)
//   );
//   useEffect(() => {
//     setCurrentTime(new Date());
//     // setLength(tasks[currentTask][1] * 60 * 1000);
//     // setLength(100);
//     setCompleteTime(new Date(currentTime.getTime() + length));
//     setCurrentTask(1);
//     setInterval(() => {
//       if (new Date() > completeTime.getTime()) {
//         console.log("next task", currentTask);
//         setCurrentTask(1);
//         setLength(tasks[currentTask][1] * 60 * 1000);
//         setCurrentTime(new Date());
//         setCompleteTime(new Date(currentTime.getTime() + length));
//       }
//       console.log(currentTime, length, completeTime);
//     }, 1000);
//   }, []);
//   // const tasks = useSelector((state) => state.selectedTasks.arr); // Array of selected tasks and time in minutes of each
//   // const [currentTask, setCurrentTask] = useState(0); // current task is used to call whichever index we're on in tasks
//   // const startTime = useSelector((state) => state.selectedTasks.startTime);
//   // const currentTime = new Date();
//   // const length = tasks[currentTask][1] * 60 * 1000; //length in milliseconds of the task we're currently on
//   // const completeTime = new Date(currentTime.getTime() + length); // the time the current task will finish

//   return (
//     <>
//       <SingleRoutine task={tasks[currentTask][0]} completeTime={completeTime} />
//     </>
//   );
// };

// export default RoutineTimer;

import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoutine from "./SingleRoutine";

class RoutineTimer extends Component {
  state = {
    currentTask: 0,
    length: 0,
    currentTime: new Date(),
    completeTime: new Date(),
  };

  componentDidMount = () => {
    this.setTaskProps();
    setInterval(() => {
      this.checkForNextTask();
    }, 250);
  };

  checkForNextTask = () => {
    if (new Date().getTime() > this.state.completeTime.getTime()) {
      this.setState({ currentTask: this.state.currentTask + 1 });
      this.setTaskProps();
    }
  };

  setTaskProps = () => {
    const length = this.props.tasks[this.state.currentTask][1] * 60 * 1000;
    const completeTime = new Date(new Date().getTime() + length);
    this.setState({ completeTime: completeTime });
  };

  render() {
    // console.log(this.state);
    return (
      <SingleRoutine
        task={this.props.tasks[this.state.currentTask][0]}
        completeTime={this.state.completeTime}
      />
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.selectedTasks.arr };
}
export default connect(mapStateToProps)(RoutineTimer);
