let initialState = [
  ["Wake Up", 0.1],
  ["Drink Water", 0.2],
  ["Make Bed", 0.1],
  ["Brush Teeth", 3],
  ["Shower", 15],
  ["Make Up", 10],
  ["Skin Care", 5],
  ["Read the News", 10],
  ["commute", 20],
];

const posTasks = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_TASK":
      // console.log("This is working");
      state.forEach((item, index) => {
        if (item.indexOf(action.payload) > -1) {
          state.splice(index, 1);
        }
      });
      // console.log(state);
      return state;
    default:
      return state;
  }
};

export default posTasks;
