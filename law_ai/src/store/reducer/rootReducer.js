// rootReducer.js
import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";
import chatReducer from "./chatReducer";
const rootReducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  chat: chatReducer,
});

export default rootReducer;
