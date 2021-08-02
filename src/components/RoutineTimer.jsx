import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoutine from "./SingleRoutine";
import Completed from "./Completed";

var timer = null;

class RoutineTimer extends Component {
  state = {
    currentTask: 0,
    length: 0,
    currentTime: new Date(),
    completeTime: new Date(),
  };

  componentDidMount = () => {
    this.setTaskProps();
    timer = setInterval(() => {
      this.checkForNextTask();
    }, 250);
  };

  checkForNextTask = () => {
    if (new Date().getTime() > this.state.completeTime.getTime()) {
      this.setState({ currentTask: this.state.currentTask + 1 });
      this.setTaskProps();
    }
  };

  setTaskProps = () => {
    if (this.props.tasks.length === this.state.currentTask) {
      // console.log("all done");
      clearTimeout(timer);
      document.body.style.backgroundColor = "#fdf7d8"; //Set bgColor back to yellow
    } else {
      const length =
        this.props.tasks[this.state.currentTask].length * 60 * 1000;
      const completeTime = new Date(new Date().getTime() + length);
      this.setState({ completeTime: completeTime });
    }
  };

  render() {
    return (
      <div>
        {this.props.tasks.length !== this.state.currentTask ? (
          <SingleRoutine
            task={this.props.tasks[this.state.currentTask].task}
            completeTime={this.state.completeTime}
          />
        ) : (
          <Completed />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.selectedTasks.arr };
}
export default connect(mapStateToProps)(RoutineTimer);
