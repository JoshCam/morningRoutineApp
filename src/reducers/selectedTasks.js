const selectedTasks = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "ADD_TASK":
      // Adds a task to the array to be displayed on the home page
      // Need to workout how to stop duplicates!
      return {
        ...state,
        arr: [...state.arr, action.payload],
      };
    default:
      return state;
  }
};

export default selectedTasks;

// for (var i = 0; i < state.arr.length; i++) {
//   if (state.arr[i].task == action.payload.task) {
//     console.log("doing nothing");
//   }
// }
