// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevToolsool } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "../reducer";

// export const store = createStore(
//   rootReducer,
//   composeWithDevToolsool(applyMiddleware(thunk))
// );
// //no funciona porq importa mal thunk??????

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
