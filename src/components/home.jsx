import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <h1>Your Morning Routing</h1>
        <p>It Looks Like you haven't got any tasks!</p>
        <p>Start building your morning routine</p>
        <Link to="/tasks">
          <button>Choose Some Tasks</button>
        </Link>
      </div>
    );
  }
}

export default Home;
