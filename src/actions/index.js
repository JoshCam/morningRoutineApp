export const updateScreen = (num) => {
  return {
    type: "UPDATE_SCREEN",
    payload: num,
  };
};

export const updateWhen = (info) => {
  return {
    type: "GOT_WHEN",
    payload: info,
  };
};
export const updateCommute = (info) => {
  return {
    type: "GOT_COMMUTE",
    payload: info,
  };
};
export const updateWhere = (info) => {
  return {
    type: "GOT_WHERE",
    payload: info,
  };
};

export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const increment = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};

export const decrement = (num) => {
  return {
    type: "DECREMENT",
    payload: num,
  };
};
