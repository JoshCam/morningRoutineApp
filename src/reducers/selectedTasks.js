const selectedTasks = (state = { arr: [] }, action) => {
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
    default:
      return state;
  }
};

export default selectedTasks;
