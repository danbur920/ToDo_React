import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleDeleteTask, handleChangeStatus } from '../actions/actions';
import { Table as AntTable, Button as AntButton, Space } from 'antd';
import '../scss/App.scss'


const TaskList = () => {
    const dispatch = useDispatch();
    const dailyTasks = useSelector(state => state.tasks.dailyTasks);
    const oneTimeTasks = useSelector(state => state.tasks.oneTimeTasks);

    const renderTaskTable = (tasks, isDaily) => (
        <div  className="table-container">
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
                            <AntButton type="default" onClick={() => dispatch(handleDeleteTask(task._id))} shape="round">
                                Usuń
                            </AntButton>
                        )}
                        <AntButton type="default" onClick={() => dispatch(handleChangeStatus(task._id))} shape="round">
                            {task.completed ? 'Oznacz jako Niewykonane' : 'Oznacz jako Wykonane'}
                        </AntButton>
                    </Space>
                )}
            />
        </AntTable>
        </div>
    );

    return (
        <div>
            <div className="task-lists" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flexBasis: '48%' }}>
                    <h2>Zadania Codzienne</h2>
                    {renderTaskTable(dailyTasks, true)}
                </div>
                <div style={{ flexBasis: '48%' }}>
                    <h2>Zadania Jednorazowe</h2>
                    {renderTaskTable(oneTimeTasks, false)}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
