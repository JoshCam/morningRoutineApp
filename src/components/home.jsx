import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScreen } from "../actions/";

const Home = () => {
  const tasks = useSelector((state) => state.selectedTasks.arr);
  const dispatch = useDispatch();
  console.log(tasks.length);

  return (
    <div className="App">
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
    </div>
  );
};

export default Home;

// <h1>Your Morning Routing</h1>
// <p>It Looks Like you haven't got any tasks!</p>
// <p>Start building your morning routine</p>
// <button onClick={() => dispatch(updateScreen(2))}>
//     Build Your Routine
// </button>
