import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHomeCoords,
  updateScreen,
  updateDuration,
  // addToPosTasks,
} from "../actions/";

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
        <div>
          <h1>Your Morning Routing</h1>
          <p>It Looks Like you haven't got any tasks!</p>
          <p>Start building your morning routine</p>

          <button onClick={() => dispatch(updateScreen(2))}>
            Build Your Routine
          </button>
        </div>
      ) : // Map over tasks in selected tasks
      selectedTasks.length > 0 ? (
        selectedTasks.map((task) => {
          return (
            <h1
            // trying to add ability to remove from selected and add back to pos
            // onClick={() =>
            //   dispatch(
            //     addToPosTasks({ task: task.task, length: task.length })
            //   )
            // }
            >
              {task.task}
            </h1>
          );
        })
      ) : (
        ""
      )}
      {/* If tasks have been selected then display this */}

      {selectedTasks.length > 0 ? (
        <div>
          <p>Your morning routine should take you about {time} minutes</p>
          <p>That means if you want to make it to work on time</p>
          <p>(and not have to rush)</p>
          <p>You'll need to wake up at {wakeUp}</p>
          <button onClick={() => dispatch(updateScreen(2))}>Add More</button>
          <button onClick={() => dispatch(updateScreen(4))}>
            Start Routine
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
