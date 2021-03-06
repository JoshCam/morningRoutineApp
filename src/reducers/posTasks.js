let initialState = [
  { task: "Wake Up", length: 1 },
  { task: "Drink Water", length: 2 },
  { task: "Make Bed", length: 1 },
  { task: "Brush Teeth", length: 3 },
  { task: "Shower", length: 15 },
  { task: "Make Up", length: 10 },
  { task: "Skin Care", length: 5 },
  { task: "Read the News", length: 10 },
  { task: "Exercise", length: 30 },
  { task: "Commute", length: 1 },
];

const posTasks = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_TASK_FROM_POS":
      for (var i = 0; i < state.length; i++) {
        if (state[i].task === action.payload) {
          state.splice(i, 1);
        }
      }
      return state;
    case "REMOVE_COMMUTE":
      // eslint-disable-next-line
      for (var i = 0; i < state.length; i++) {
        if (state[i].task === "Commute") {
          state.splice(i, 1);
        }
      }
      return state;
    // Possible case to add task back to Pos tasks (remove from selected)
    case "ADD_TASK_TO_POS":
      state = [...state, action.payload];
      state = Array.from(new Set(state.map(JSON.stringify))).map(JSON.parse); // Removes duplicate tasks
      return state;
    default:
      return state;
  }
};

export default posTasks;
