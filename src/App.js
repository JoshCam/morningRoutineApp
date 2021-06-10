import "./App.css";
import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./actions";

// My Components
import Home from "./components/home";
import Info from "./components/info";
import Tasks from "./components/tasks";

// screen 0 is inital info screen
// screen 1 is homescreen
// screen 2 is Task Select screen

function App() {
  const count = useSelector((state) => state.count);
  const screen = useSelector((state) => state.screen);
  // const dispatch = useDispatch();
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
      {/* <br></br>
      <hr></hr>
      <p>The count is {count}</p>
      <button onClick={() => dispatch(decrement(5))}>-</button>
      <button onClick={() => dispatch(increment(5))}>+</button> */}
    </div>
  );
}

export default App;
