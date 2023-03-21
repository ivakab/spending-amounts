import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import spendingReducer from "./spending-reducer";
import categoriesReducer from "./categories-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  spendingReducer,
  categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
