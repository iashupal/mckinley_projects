import { combineReducers } from "redux";
import { reducer as authReducer } from "../redux/auth";
import moments from "./moments";
import vibes from "./vibes";
import momentVibeComments from "./momentVibeComments";
import profile from "./profile";
import store from "./store";
import donation from "./donation";

export default combineReducers({
  auth: authReducer,
  moments,
  vibes,
  momentVibeComments,
  profile,
  store,
  donation
});
