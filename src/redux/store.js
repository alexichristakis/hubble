import { combineReducers, createStore } from "redux";
import keplerGlReducer from "./reducers";

const reducers = combineReducers({ keplerGl: keplerGlReducer });
const initialState = {};

export default createStore(reducers, initialState);
