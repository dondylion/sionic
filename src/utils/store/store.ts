import { createStore, combineReducers } from "redux";
import {createReducer} from "redux-orm";
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export default store;
