import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { taskMiddleware } from "react-palm";

import keplerGlReducer from "./reducers";

const reducers = combineReducers({ keplerGl: keplerGlReducer });
const initialState = {};

export const middlewares = [taskMiddleware, thunk];

export const enhancers = [applyMiddleware(...middlewares)];

export default createStore(reducers, initialState, compose(...enhancers));
// export default createStore(reducers, initialState);
