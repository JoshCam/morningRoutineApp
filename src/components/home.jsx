import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHomeCoords,
  updateScreen,
  updateDuration,
  addTaskToPos,
  removeTaskFromSelected,
} from "../actions";

import moment from "moment";

// Screen that displays all selected tasks

const Home = () => {
  const selectedTasks = useSelector((state) => state.selectedTasks.arr);
  const posTasks = useSelector((state) => state.posTasks);
  // console.log("tasks", selectedTasks);
  // userInfo
  const commute = useSelector((state) => state.userInfo.commute);
  const when = useSelector((state) => state.userInfo.when);

  const time = useSelector((state) => state.time);

  const work = useSelector((state) => state.userInfo.coords);
  const home = useSelector((state) => state.userInfo.homeCoords);
  const dispatch = useDispatch();

  // Turns when input into integers - will probs put in a function later
  let newStr = when.split("");
  newStr.splice(2, 1);
  newStr = newStr.join("");
  let hour = newStr.slice(0, 2);
  let minute = newStr.slice(2, 4);

  // Work out time to wake up
  let wakeUp = moment()
    .hours(hour)
    .minutes(minute)
    .subtract(time, "minutes")
    .format("h:mm");

  if (commute) {
    // Gets coordinates of users home if they commute
    // This is to later calculate their commute time
    navigator.geolocation.getCurrentPosition((position) => {
      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      dispatch(updateHomeCoords(latlng));
    });
  }

  if (home.lat) {
    let googURL =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
      home.lat +
      "," +
      home.lng +
      "&destinations=" +
      work.lat +
      "," +
      work.lng +
      "&key=AIzaSyDvGymWobmXGa0CtbocnF1jwGt0AX9mkeM";

    fetch(googURL)
      .then((response) => response.json())
      .then((data) =>
        dispatch(updateDuration(data.rows[0].elements[0].duration.value))
      );
  }

  return (
    <div className="App">
      {/* If no tasks selected display this */}
      {selectedTasks.length === 0 ? (
        <div className="container">
          <p className="heading">Your Morning Routine</p>
          <p>It Looks Like you haven't got any tasks!</p>
          <p>Start building your morning routine</p>

          <a className="btn build" onClick={() => dispatch(updateScreen(2))}>
            Build Your Routine
          </a>
        </div>
      ) : // Map over tasks in selected tasks
      selectedTasks.length > 0 ? (
        <div className="selectedTaskContainer">
          {selectedTasks.map((task) => {
            return (
              <p
                className="selectedTask"
                // trying to add ability to remove from selected and add back to pos
                onClick={() => {
                  dispatch(
                    addTaskToPos({ task: task.task, length: task.length })
                  );
                  dispatch(
                    removeTaskFromSelected({
                      task: task.task,
                      length: task.length,
                    })
                  );
                }}
              >
                {task.task}
              </p>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {/* If tasks have been selected then display this */}

      {selectedTasks.length > 0 ? (
        <div className="homeInfoContainer">
          <div className="homeTextContainer">
            <p>Your morning routine should take you {time} minutes</p>
            <p>That means if you want to start work on time</p>
            {/* <p>(and not have to rush)</p> */}
            <p>You'll need to wake up at {wakeUp}</p>
            <p className="small">(To remove a task just click it!)</p>
          </div>

          <div className="btnContainer">
            <a className="btn add" onClick={() => dispatch(updateScreen(2))}>
              Add More
            </a>
            <a className="btn start" onClick={() => dispatch(updateScreen(4))}>
              Start Routine
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

// () => {
//   dispatch(addTaskToPos({ task: task.task, length: task.length }));
// },
//   () => {
//     dispatch(
//       removeTaskFromSelected({
//         task: task.task,
//         length: task.length,
//       })
//     );
//   };
