const selectedTasks = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        arr: [...state.arr, action.payload],
      };
    default:
      return state;
  }
};

export default selectedTasks;
