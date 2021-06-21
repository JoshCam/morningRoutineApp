import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHomeCoords, updateScreen } from "../actions/";

// Screen that displays all selected tasks

const Home = () => {
  const tasks = useSelector((state) => state.selectedTasks.arr);
  const commute = useSelector((state) => state.userInfo.commute);
  const time = useSelector((state) => state.time);
  const dispatch = useDispatch();
  // console.log(tasks.length);

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

  return (
    <div className="App">
      {/* If no tasks selected display this */}
      {tasks.length === 0 ? (
        <div>
          <h1>Your Morning Routing</h1>
          <p>It Looks Like you haven't got any tasks!</p>
          <p>Start building your morning routine</p>

          <button onClick={() => dispatch(updateScreen(2))}>
            Build Your Routine
          </button>
        </div>
      ) : // Map over tasks in selected tasks
      tasks.length > 0 ? (
        tasks.map((task) => {
          return <h1>{task}</h1>;
        })
      ) : (
        ""
      )}
      {/* If tasks have been selected then display this */}

      {tasks.length > 0 ? (
        <div>
          <p>Your morning routine should take you about {time} minutes</p>
          <p>That means if you want to make it to work on time</p>
          <p>(and not have to rush)</p>
          <p>
            You'll need to leave your place at WILL PROBS HAVE TO USE MOMENT FOR
            THIS
          </p>
          <button onClick={() => dispatch(updateScreen(2))}>
            test/Add More
          </button>
          <button onClick={() => dispatch(updateScreen(3))}>
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
