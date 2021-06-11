let initialState = {
  when: "00:00",
  commute: false,
  where: "",
  coords: {},
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case "GOT_WHEN":
      return {
        ...state,
        when: action.payload,
      };
    case "GOT_COMMUTE":
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
    default:
      return state;
  }
};

export default userInfo;
