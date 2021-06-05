import React, { Component } from "react";
import TaskCard from "./taskCard";

class Tasks extends Component {
  state = {
    task: ["Wake Up", "Drink Water", "Make Bed", "Brush Teeth", "Shower"],
  };
  render() {
    return (
      <div>
        {this.state.task.map((task) => {
          return <TaskCard task={task} addTask={this.props.addTask} />;
        })}
      </div>
    );
  }
}

export default Tasks;
