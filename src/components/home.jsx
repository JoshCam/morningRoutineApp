import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHomeCoords, updateScreen } from "../actions/";

const Home = () => {
  const tasks = useSelector((state) => state.selectedTasks.arr);
  const commute = useSelector((state) => state.userInfo.commute);
  const dispatch = useDispatch();
  console.log(tasks.length);

  if (commute) {
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
      ) : (
        ""
      )}
      {/* If tasks have been selected then display this */}
      {tasks.map((task) => {
        return <h1>{task}</h1>;
      })}
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
