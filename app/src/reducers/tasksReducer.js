import { FETCH_TASKS, ADD_TASK, DELETE_TASK, CHANGE_STATUS } from '../actions/actions';

const initialState = {
  dailyTasks: [],
  oneTimeTasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        dailyTasks: action.payload.filter(task => !task.isDisposable),
        oneTimeTasks: action.payload.filter(task => task.isDisposable),
      };
    case ADD_TASK:
      console.log("State before ADD_TASK: ", state); 
      return {
        ...state,
        dailyTasks: action.payload.isDisposable ? state.dailyTasks : [...state.dailyTasks, action.payload],
        oneTimeTasks: action.payload.isDisposable ? [...state.oneTimeTasks, action.payload] : state.oneTimeTasks,
      };
    case DELETE_TASK:
      return {
        ...state,
        dailyTasks: state.dailyTasks.filter(task => task._id !== action.payload),
        oneTimeTasks: state.oneTimeTasks.filter(task => task._id !== action.payload),
      };
    case CHANGE_STATUS:
      return {
        ...state,
        dailyTasks: state.dailyTasks.map(task => 
          task._id === action.payload ? { ...task, completed: !task.completed } : task
        ),
        oneTimeTasks: state.oneTimeTasks.map(task => 
          task._id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      return state;
  }
};

export default tasksReducer;
