import React from 'react';
import { AddTask } from './TaskForm';
import { useDispatch } from 'react-redux';
import { handleAddTask } from '../actions/actions';

const AddTaskPage = () => {
    const dispatch = useDispatch();

    const handleAddNewTask = (newTask) => {
        dispatch(handleAddTask(newTask));
    };

    return (
        <div>
            <h1>Add a New Task</h1>
            <AddTask onAddTask={handleAddNewTask} />
        </div>
    );
};

export default AddTaskPage;