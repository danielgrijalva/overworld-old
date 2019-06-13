import { combineReducers } from "redux";
import landing from "./landing";
import game from "./game";
import auth from "./auth";
import profile from "./profile";

export default combineReducers({
  landing,
  game,
  auth,
  profile
});
