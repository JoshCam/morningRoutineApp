import React, { Component } from "react";
import "./App.css";

import Home from "./components/home";
import Info from "./components/infoForm";
import Tasks from "./components/tasks";

// screen 0 is inital info screen
// screen 1 is homescreen
// screen 2 is Task Select screen

class App extends Component {
  state = {
    screen: 0,
    gotInfo: false,
    initInfo: { startWork: 0, isCommute: false, location: "" },
    selectedTasks: "",
  };

  updateInfo = (when, commute, where) => {
    this.setState(
      {
        gotInfo: true,
        initInfo: { startWork: when, isCommute: commute, location: where },
      },
      () => console.log(this.state)
    );
  };

  updateScreen = (screenNum) => {
    this.setState({ screen: screenNum });
  };

  // addTask = (task) => {
  //   this.setState({ selectedTasks: [task] }, () => console.log(this.state));
  // };

  render() {
    return (
      <div className="App">
        {this.state.screen === 0 ? (
          <Info updateInfo={this.updateInfo} updateScreen={this.updateScreen} />
        ) : this.state.screen === 1 ? (
          <Home updateScreen={this.updateScreen} />
        ) : this.state.screen === 2 ? (
          <Tasks addTask={this.addTask} />
        ) : (
          "Error"
        )}
      </div>
    );
  }
}

export default App;
