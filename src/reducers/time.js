const time = (state = 0, action) => {
  switch (action.type) {
    case "ADD_TIME":
      state = state + action.payload;
      return state;
    default:
      return state;
  }
};

export default time;
