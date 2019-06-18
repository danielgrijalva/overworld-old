import { combineReducers } from "redux";
import landing from "./modules/landing/reducers";
import game from "./modules/game/reducers";
import auth from "./modules/app/reducers";
import profile from "./modules/profile/reducers";

export default combineReducers({
  landing,
  game,
  auth,
  profile
});
