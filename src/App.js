import "./App.css";
import { useSelector } from "react-redux";
// import { increment, decrement } from "./actions";

// My Components
import Home from "./components/home";
import Info from "./components/info";
import Tasks from "./components/tasks";

// screen 0 is inital info screen
// screen 1 is homescreen
// screen 2 is Task Select screen

function App() {
  const screen = useSelector((state) => state.screen);
  return (
    <div className="App">
      {screen === 0 ? (
        <Info />
      ) : screen === 1 ? (
        <Home />
      ) : screen === 2 ? (
        <Tasks />
      ) : (
        "Error"
      )}
    </div>
  );
}

export default App;
