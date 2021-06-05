import React, { Component } from "react";

class TaskCard extends Component {
  state = {};
  render() {
    return (
      <div key={this.props.task} onClick={this.props.addTask(this.props.task)}>
        {this.props.task}
      </div>
    );
  }
}

export default TaskCard;
