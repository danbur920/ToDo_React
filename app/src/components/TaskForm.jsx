import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button as AntButton, Input, Select } from 'antd';
import '../scss/TaskForm.scss'; 

const { Option } = Select;

export function AddTask({ onAddTask }) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory, setTaskCategory] = useState('DOM');
    const [completedValue, setCompletedValue] = useState('Niewykonane');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const newTask = {
            name: taskName,
            description: taskDescription,
            category: taskCategory,
            completed: completedValue === 'Wykonane',
            isDisposable: true
        };

        onAddTask(newTask);

        setTaskName('');
        setTaskDescription('');
        setTaskCategory('DOM');
        setCompletedValue('Niewykonane');
    };

    return (
        <div className='form-container'>
            <div className='form-frame'>
                <form onSubmit={handleSubmit}>
                    <div className='form-item'>
                        <label>Nazwa zadania:</label>
                        <Input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </div>
                    <div className='form-item'>
                        <label>Opis zadania:</label>
                        <Input.TextArea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                    </div>
                    <div className='form-item'>
                        <label>Kategoria zadania:</label>
                        <Select value={taskCategory} onChange={(value) => setTaskCategory(value)} className="form-select">
                            <Option value="DOM">DOM</Option>
                            <Option value="PRACA">PRACA</Option>
                            <Option value="CZAS WOLNY">CZAS WOLNY</Option>
                        </Select>
                    </div>
                    <div className='form-item'>
                        <label>Stan zadania:</label>
                        <Select value={completedValue} onChange={(value) => setCompletedValue(value)} className="form-select">
                            <Option value="Wykonane">Wykonane</Option>
                            <Option value="Niewykonane">Niewykonane</Option>
                        </Select>
                    </div>
                    <motion.button 
                        type="primary" 
                        htmlType="submit" 
                        shape="round" 
                        className="form-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Dodaj zadanie
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
