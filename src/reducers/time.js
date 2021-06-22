const time = (state = 0, action) => {
  // Adds time to the routine, i.e. making the bed takes 2mins, teeth takes 3 mins
  switch (action.type) {
    case "ADD_TIME":
      state = state + action.payload;
      return state;
    default:
      return state;
  }
};

export default time;
