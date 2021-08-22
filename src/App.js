import "./styles/App.css";
import React from "react";

// My Components
import Login from "./components/Login";
import Home from "./components/Home";
import Info from "./components/Info";
import Tasks from "./components/Tasks";
import Routine from "./components/Routine";
import RoutineTimer from "./components/RoutineTimer";
import UpdateInfo from "./components/UpdateInfo";

import { updateScreen } from "./actions";
import { useSelector, useDispatch } from "react-redux";

// screen 0 is initial info screen
// screen 1 is home screen
// screen 2 is Task Select screen
// Screen 3 is to start morning routine timer
// Screen 4 is morning routine timer
// Screen 5 is login screen
// Screen 6 is update Info Screen

function App() {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screen);
  const user_id = useSelector((state) => state.userInfo.user_id);

  const myRef = React.useRef();

  let logOut = () => {
    localStorage.clear();
    dispatch(updateScreen(5));
    window.location.reload();
  };

  function navFunc() {
    var x = myRef.current;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  return (
    <div className="App">
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
      ) : screen === 6 ? (
        <UpdateInfo />
      ) : (
        "Error"
      )}
      {user_id > 0 ? ( //Checks if a user is logged in then displays nav bar
        // <!-- Top Navigation Menu -->
        <div className="topnav">
          <a
            href="#home"
            className="home"
            onClick={() => {
              window.location.reload();
              dispatch(updateScreen(1));
            }}
          >
            Home
          </a>

          {/* <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links --> */}
          <a href="/#" className="options" onClick={() => navFunc()}>
            Options
          </a>

          {/* <!-- Navigation links (hidden by default) --> */}
          <div id="myLinks" ref={myRef}>
            <a href="#info" onClick={() => dispatch(updateScreen(6))}>
              Update Your Info
            </a>
            <a href="#logout" onClick={() => logOut()}>
              log Out
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
