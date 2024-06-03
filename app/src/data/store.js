import { legacy_createStore as createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import tasksReducer from '../reducers/tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;