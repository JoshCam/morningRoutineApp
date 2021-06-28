const selectedTasks = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "ADD_TASK":
      // Adds a task to the array to be displayed on the home page
      // MAKE THIS A SET? ONLY ONE OF EACH ITEM CAN EXIST IN IT!
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
