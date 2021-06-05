import React, { Component } from "react";

import "../App.css";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <h1>Your Morning Routing</h1>
        <p>It Looks Like you haven't got any tasks!</p>
        <p>Start building your morning routine</p>
        <button onClick={() => this.props.updateScreen(2)}>
          Choose Some Tasks
        </button>
      </div>
    );
  }
}

export default Home;
