const screenMode = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_SCREEN":
      return (state = action.payload);
    default:
      return state;
  }
};

export default screenMode;

// screen 0 is inital info screen
// screen 1 is homescreen
// screen 2 is Task Select screen
// Screen 3 is to start morning routine timer
// Screen 4 is morning routine timer
