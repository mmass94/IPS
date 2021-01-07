/** @format */

import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import Videos from "./Videos";

export default combineReducers({
  alert,
  auth,
  Videos,
});
