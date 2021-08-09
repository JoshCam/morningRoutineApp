const selectedTasks = (state = { arr: [] }, action) => {
  // console.log(state);
  switch (action.type) {
    case "ADD_TASK_TO_SELECTED":
      // Adds tasks to selected tasks array - removes duplicates
      state = { ...state, arr: [...state.arr, action.payload] };
      state.arr = Array.from(new Set(state.arr.map(JSON.stringify))).map(
        JSON.parse
      );
      return state;
    case "REMOVE_TASK_FROM_SELECTED":
      for (var i = 0; i < state.arr.length; i++) {
        if (state.arr[i].task === action.payload.task) {
          state.arr.splice(i, 1);
        }
      }
      return state;
    case "BULK_UPDATE_SELECTED":
      if (action.payload[0].task === null) {
        // Back end returns null when no tasks are found, this stops null getting added to state
        return state;
      } else {
        state = { ...state, arr: action.payload };
        return state;
      }
    // console.log(state);
    default:
      return state;
  }
};

export default selectedTasks;
