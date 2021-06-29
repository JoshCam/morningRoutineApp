export const updateScreen = (num) => {
  // Updates screen mode
  return {
    type: "UPDATE_SCREEN",
    payload: num,
  };
};

export const updateWhen = (info) => {
  // Adds when the user starts work to the state
  return {
    type: "GOT_WHEN",
    payload: info,
  };
};
export const updateCommute = (info) => {
  // Updates boolean from false to true if user commutes (If they do we auto get their home coords)
  return {
    type: "GOT_COMMUTE",
    payload: info,
  };
};
export const updateWhere = (info) => {
  // Add users work address to state
  return {
    type: "GOT_WHERE",
    payload: info,
  };
};

export const updateCoords = (info) => {
  // Add the users work coordinates to state (this will be used to work out travel time)
  return {
    type: "GOT_COORDS",
    payload: info,
  };
};
export const updateHomeCoords = (info) => {
  // Add the users home coordinates to state (this will be used to work out travel time)
  return {
    type: "GOT_HOME_COORDS",
    payload: info,
  };
};

export const updateDuration = (info) => {
  // Add commute time in seconds to state if user said they commute
  return {
    type: "UPDATE_DURATION",
    payload: info,
  };
};

export const removeCommute = () => {
  // Remove commute from list of tasks if user said they dont commute!
  return {
    type: "REMOVE_COMMUTE",
  };
};

export const addTask = (task) => {
  // Add a task to the selectedTasks list - this displays on the home screen!
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const posTask = (task) => {
  // Remove a task from the "posTask" (Possible Tasks to choose from)
  return {
    type: "REMOVE_TASK",
    payload: task,
  };
};

export const addToPosTasks = (task) => {
  // Send task back to pos Task array
  return {
    type: "ADD_TO_POS_TASKS",
    payload: task,
  };
};

export const time = (time) => {
  // Add time to the users morning routine per task selected
  return {
    type: "ADD_TIME",
    payload: time,
  };
};
