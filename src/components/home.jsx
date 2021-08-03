import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHomeCoords,
  updateScreen,
  updateDuration,
  addTaskToPos,
  removeTaskFromSelected,
  bulkUpdateSelected,
  time,
} from "../actions";

import moment from "moment";
import Axios from "axios";

// Screen that displays all selected tasks

const Home = () => {
  const selectedTasks = useSelector((state) => state.selectedTasks.arr);
  // userInfo
  const when = useSelector((state) => state.userInfo.when);

  const length = useSelector((state) => state.time);

  const work = useSelector((state) => state.userInfo.coords);
  const dispatch = useDispatch();

  // Turns 'when' input into integers
  let newStr = when.split("");
  newStr.splice(2, 1);
  newStr = newStr.join("");
  let hour = newStr.slice(0, 2);
  let minute = newStr.slice(2, 4);

  // Work out time to wake up
  let wakeUp = moment()
    .hours(hour)
    .minutes(minute)
    .subtract(length, "minutes")
    .format("h:mm");

  useEffect(() => {
    // Gets coordinates of users home
    // This is to later calculate their commute time
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        Axios
          // sends request to the back to get travel time of commute
          .post("http://localhost:6001/commute", { home: latlng, work: work })
          .then((response) => {
            dispatch(updateDuration(response.data.data));
          });
        dispatch(updateHomeCoords(latlng)); // Once updated server - store data locally
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(async () => {
    console.log("component mounted");
    const results = await Axios.post("http://localhost:6001/get_tasks", {
      token: localStorage.getItem("token"),
    });
    console.log(results.data.results);
    dispatch(bulkUpdateSelected(results.data.results)); // sends results to state
    for (let i = 0; i < results.data.results.length; i++) {
      // Adds each length component of each task to store
      dispatch(time(results.data.results[i].length));
    }
  }, []);

  return (
    <div className="App">
      {/* If no tasks selected display this */}
      {selectedTasks.length === 0 ? (
        <div className="container">
          <p className="heading">Your Morning Routine</p>
          <p>It Looks Like you haven't got any tasks!</p>
          <p>Start building your morning routine</p>

          <a
            href="/#"
            className="btn build"
            onClick={() => dispatch(updateScreen(2))}
          >
            Build Your Routine
          </a>
        </div>
      ) : // Map over tasks in selected tasks
      selectedTasks.length > 0 ? (
        <div className="selectedTaskContainer">
          {selectedTasks.map((task, index) => {
            return (
              <p
                key={index}
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
            <p>Your morning routine should take you {length} minutes</p>
            <p>That means if you want to start work on time</p>
            {/* <p>(and not have to rush)</p> */}
            <p>You'll need to wake up at {wakeUp}</p>
            <p className="small">(To remove a task just click it!)</p>
          </div>

          <div className="btnContainer">
            <a
              href="/#"
              className="btn add"
              onClick={() => dispatch(updateScreen(2))}
            >
              Add More
            </a>
            <a
              href="/#"
              className="btn start"
              onClick={() => dispatch(updateScreen(4))}
            >
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
