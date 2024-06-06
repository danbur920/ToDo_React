// import { useCrsfToken } from '';

export const FETCH_TASKS = 'FETCH_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const fetchTasks = (tasks) => ({
  type: FETCH_TASKS,
  payload: tasks,
});

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const changeStatus = (id) => ({
  type: CHANGE_STATUS,
  payload: id,
});

export const fetchTasksFromAPI = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8080/api/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tasks = await response.json();
      dispatch(fetchTasks(tasks));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };
};

export const handleAddTask = (newTask) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const savedTask = await response.json();
      dispatch(addTask(savedTask));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };
};

export const handleDeleteTask = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteTask(id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
};

export const handleChangeStatus = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTask = await response.json();
      dispatch(changeStatus(updatedTask._id));
    } catch (error) {
      console.error('Failed to change task status:', error);
    }
  };
};
