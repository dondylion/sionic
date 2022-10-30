import {combineReducers} from 'redux';
import {someReducer} from './reducers/someReducer';
// import {ormReducer} from './orm/ormReducer';

const rootReducer = combineReducers({
    someReducer: someReducer,
    // ormReducer: ormReducer,
  });
  
  export default rootReducer;
  
