const screenMode = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_SCREEN":
      return (state = action.payload);
    default:
      return state;
  }
};

export default screenMode;
