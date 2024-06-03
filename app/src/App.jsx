import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddTask } from './components/TaskForm';
import { Button as AntButton, Table as AntTable, Space } from 'antd';
import { fetchTasks, addTask, deleteTask, changeStatus } from './actions/actions';
import './scss/App.scss';

function App() {
    const dispatch = useDispatch();
    const dailyTasks = useSelector(state => state.tasks.dailyTasks);
    const oneTimeTasks = useSelector(state => state.tasks.oneTimeTasks);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    useEffect(() => {
        fetchTasksFromAPI();
    }, []);

    const fetchTasksFromAPI = async () => {
        const response = await fetch('http://localhost:8080/api/todos');
        const tasks = await response.json();
        dispatch(fetchTasks(tasks));
    };

    const handleAddTask = async (newTask) => {
        const response = await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        const savedTask = await response.json();
        dispatch(addTask(savedTask));
        setIsAddTaskOpen(false);
    };

    const handleDeleteTask = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE'
        });
        dispatch(deleteTask(id));
        fetchTasksFromAPI();
    };

    const handleChangeStatus = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PATCH'
        });
        dispatch(changeStatus(id));
        fetchTasksFromAPI();
    };

    const renderTaskTable = (tasks, isDaily) => (
        <AntTable dataSource={tasks} rowKey="_id">
            <AntTable.Column title="Nazwa" dataIndex="name" key="name" />
            <AntTable.Column title="Opis" dataIndex="description" key="description" />
            <AntTable.Column title="Kategoria" dataIndex="category" key="category" />
            <AntTable.Column 
                title="Status" 
                key="completed" 
                render={(_, task) => (
                    <span className={task.completed ? 'completed' : 'not-completed'}>
                        {task.completed ? 'Wykonane' : 'Niewykonane'}
                    </span>
                )} 
            />
            <AntTable.Column
                title="Akcje"
                key="actions"
                render={(_, task) => (
                    <Space size="middle">
                        {!isDaily && task.completed && (
                            <AntButton type="default" onClick={() => handleDeleteTask(task._id)} shape="round">
                                Usuń
                            </AntButton>
                        )}
                        <AntButton type="default" onClick={() => handleChangeStatus(task._id)} shape="round">
                            {task.completed ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}
                        </AntButton>
                    </Space>
                )}
            />
        </AntTable>
    );

    return (
        <div className="app-container">
            <div className="left-list">
                <h2>Zadania dzienne</h2>
                {renderTaskTable(dailyTasks, true)}
                <div className="button-container">
                    <AntButton type="primary" onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}>
                        {isAddTaskOpen ? 'Anuluj' : 'Dodaj zadanie'}
                    </AntButton>
                </div>
                {isAddTaskOpen && <AddTask onAddTask={handleAddTask} />}
            </div>
            <div className="right-list">
                <h2>Zadania jednorazowe</h2>
                {renderTaskTable(oneTimeTasks, false)}
            </div>
        </div>
    );
}

export default App;
