import React, { useState } from "react";

const SelectedTask = (props) => {
  // Text colour of tasks - used to update colour on click
  // to indicate the task will/has been removed
  const [textColour, setTextColour] = useState("#0c1b33");

  return (
    <div>
      <p style={{ color: textColour }} onClick={setTextColour("#ff5e5e")}>
        {props.task}
      </p>
    </div>
  );
};

export default SelectedTask;
