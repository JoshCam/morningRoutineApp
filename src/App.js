import "./styles/App.css";
import { useSelector } from "react-redux";

// My Components
import Login from "./components/Login";
import Home from "./components/Home";
import Info from "./components/Info";
import Tasks from "./components/Tasks";
import Routine from "./components/Routine";
import RoutineTimer from "./components/RoutineTimer";

// screen 0 is inital info screen
// screen 1 is homescreen
// screen 2 is Task Select screen
// Screen 3 is to start morning routine timer
// Screen 4 is morning routine timer
// Screen 5 is login screen

function App() {
  const screen = useSelector((state) => state.screen);
  return (
    <div className="App">
      <button onClick={() => localStorage.clear()}>Log Out</button>
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
    </div>
  );
}

export default App;
