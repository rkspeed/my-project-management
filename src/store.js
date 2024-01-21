import { createStore, combineReducers } from 'redux';
import projectReducer from './reducers/projectReducer';

const rootReducer = combineReducers({
  project: projectReducer
});

const store = createStore(rootReducer);

export default store;
