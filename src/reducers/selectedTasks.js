const selectedTasks = (
  state = { arr: [], currentTask: 0, startTime: 0 },
  action
) => {
  switch (action.type) {
    case "ADD_TASK":
      // Adds a task to the array to be displayed on the home page
      if (state.arr.includes(action.payload)) {
        // Do nothing if task is already in array
        console.log("doing Nothing");
      } else
        return {
          ...state,
          arr: [...state.arr, action.payload],
        };
    case "SET_TASK":
      return {
        ...state,
        currentTask: state.currentTask + 1,
        startTime: 0,
      };
    default:
      return state;
  }
};

export default selectedTasks;
