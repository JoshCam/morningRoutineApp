let initialState = [
  ["Wake Up", 2],
  ["Drink Water", 1],
  ["Make Bed", 2],
  ["Brush Teeth", 3],
  ["Shower", 15],
  ["Make Up", 10],
  ["Skin Care", 5],
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
