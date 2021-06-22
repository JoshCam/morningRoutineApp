const selectedTasks = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "ADD_TASK":
      if (state.arr.includes(action.payload)) {
        // Do nothing if task is already in array
        console.log("doing Nothing");
      } else
        return {
          // ...state,
          arr: [...state.arr, action.payload],
        };
    default:
      return state;
  }
};

export default selectedTasks;
