import countReducer from "./count";
import screenMode from "./screenMode";
import userInfo from "./userInfo";
import selectedTasks from "./selectedTasks";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  count: countReducer,
  screen: screenMode,
  userInfo,
  selectedTasks,
});

export default rootReducer;
