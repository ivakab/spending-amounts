import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import spendingReducer from "./spending-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  spendingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
