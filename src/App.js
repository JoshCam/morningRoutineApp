import "./styles/App.css";

// My Components
import Login from "./components/Login";
import Home from "./components/Home";
import Info from "./components/Info";
import Tasks from "./components/Tasks";
import Routine from "./components/Routine";
import RoutineTimer from "./components/RoutineTimer";

import { updateScreen } from "./actions";
import { useSelector, useDispatch } from "react-redux";

// screen 0 is initial info screen
// screen 1 is home screen
// screen 2 is Task Select screen
// Screen 3 is to start morning routine timer
// Screen 4 is morning routine timer
// Screen 5 is login screen

function App() {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screen);
  const user_id = useSelector((state) => state.userInfo.user_id);

  let logOut = () => {
    localStorage.clear();
    dispatch(updateScreen(5));
    window.location.reload();
  };

  return (
    <div className="App">
      <button onClick={() => logOut()}>Log Out</button>
      {screen === 0 ? (
        <Info />
      ) : screen === 1 ? (
        <Home />
      ) : screen === 2 ? (
        <Tasks />
      ) : screen === 3 ? (
        <Routine />
      ) : screen === 4 ? (
        <RoutineTimer />
      ) : screen === 5 ? (
        <Login />
      ) : (
        "Error"
      )}
      {user_id > 0 ? (
        <div className="toolBar">
          <div
            className="back"
            onClick={() => {
              window.location.reload();
              dispatch(updateScreen(1));
            }}
          >
            Home
          </div>
          <div className="userOptions">Options</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
