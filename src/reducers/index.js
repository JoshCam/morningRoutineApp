import screenMode from "./screenMode";
import userInfo from "./userInfo";
import selectedTasks from "./selectedTasks";
import posTasks from "./posTasks";
import time from "./time";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  screen: screenMode,
  userInfo,
  selectedTasks,
  posTasks,
  time,
});

export default rootReducer;
