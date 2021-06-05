import React, { Component } from "react";
import { Link } from "react-router-dom";

class Info extends Component {
  state = { when: 0, commute: false, where: "" };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  outputHTML(boolean) {
    if (!boolean) return null;
    return (
      <div>
        <label>Where do you work?</label>
        <br></br>
        <input
          type="text"
          id="where"
          value={this.state.where}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Info</h1>
        <form>
          <label>When do you start work in the morning?</label>
          <br></br>
          <input
            id="when"
            type="time"
            value={this.state.when}
            onChange={this.handleChange}
          ></input>
          <br></br>
          <label>Do you commute?</label>
          <br></br>
          <select
            id="commute"
            value={this.state.commute}
            onChange={this.handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br></br>
          {/* Only display code if user commutes */}
          {this.outputHTML(this.state.commute)}
          <br></br>
          <Link to="/">
            <button
              type="submit"
              onClick={() =>
                this.props.updateInfo(
                  this.state.when,
                  this.state.commute,
                  this.state.where
                )
              }
            >
              Finished
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Info;
