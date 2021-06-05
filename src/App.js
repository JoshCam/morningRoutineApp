import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Home from "./components/home";
import Info from "./components/infoForm";
import Tasks from "./components/tasks";

class App extends Component {
  state = {
    page: "/info",
    gotInfo: false,
    initInfo: { startWork: 0, isCommute: false, location: "" },
    selectedTasks: "",
  };

  updateInfo = (when, commute, where) => {
    this.setState(
      {
        page: "/",
        gotInfo: true,
        initInfo: { startWork: when, isCommute: commute, location: where },
      },
      () => console.log(this.state)
    );
  };

  addTask = (task) => {
    this.setState({ selectedTasks: [task] }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {!this.state.gotInfo ? (
            <Redirect from="/" to={this.state.page} />
          ) : (
            ""
          )}
          <Switch>
            <Route exact path="/info">
              <Info updateInfo={this.updateInfo} />
            </Route>
            <Route exact path="/tasks">
              <Tasks addTask={this.addTask} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
