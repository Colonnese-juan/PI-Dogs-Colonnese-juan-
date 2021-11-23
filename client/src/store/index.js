import { createStore, applyMiddleware } from "redux";
import { composeWithDevToolsool } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevToolsool(applyMiddleware(thunk))
);
