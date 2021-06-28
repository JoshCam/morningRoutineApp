let initialState = [
  { task: "Wake Up", length: 0.05 },
  { task: "Drink Water", length: 0.05 },
  { task: "Make Bed", length: 1 },
  { task: "Brush Teeth", length: 3 },
  { task: "Shower", length: 15 },
  { task: "Make Up", length: 10 },
  { task: "Skin Care", length: 5 },
  { task: "Read the News", length: 10 },
  { task: "Commute", length: 1 },
];

const posTasks = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_TASK":
      // Need to make it so we cant add the same task twice but struggling!
      for (var i = 0; i < state.length; i++) {
        if (state[i].task === action.payload) {
          state.splice(i, 1);
        }
      }
      return state;
    default:
      return state;
  }
};

export default posTasks;
