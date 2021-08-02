let initialState = {
  when: "00:00", //When the user starts work
  commute: false,
  where: "", // Work address
  coords: {}, //work
  homeCoords: {}, //Home
  duration: 0, // duration of travel time (commute) in seconds
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case "GOT_WHEN":
      return {
        ...state,
        when: action.payload,
      };
    case "GOT_COMMUTE":
      // console.log("Commute reducer called");
      return {
        ...state,
        commute: action.payload,
      };
    case "GOT_WHERE":
      return {
        ...state,
        where: action.payload,
      };
    case "GOT_COORDS":
      return {
        ...state,
        coords: action.payload,
      };
    case "GOT_HOME_COORDS":
      return {
        ...state,
        homeCoords: action.payload,
      };
    case "UPDATE_DURATION":
      return {
        ...state,
        duration: action.payload,
      };
    default:
      return state;
  }
};

export default userInfo;
