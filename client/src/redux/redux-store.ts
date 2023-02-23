import { combineReducers, legacy_createStore as createStore } from "redux";
import spendingReducer from "./spending-reducer";

const rootReducer = combineReducers({
  spendingReducer,
});

const store = createStore(rootReducer);

export default store;
