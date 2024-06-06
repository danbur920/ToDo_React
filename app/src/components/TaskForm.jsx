import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button as AntButton, Input, Select } from 'antd';
import '../scss/TaskForm.scss'; 
import loadingPhoto from '../icons/waiting.svg'
import DOMPurify from 'dompurify';
import React from 'react';

const { Option } = Select;

export function AddTask({ onAddTask }) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory, setTaskCategory] = useState('DOM');
    const [completedValue, setCompletedValue] = useState('Niewykonane');
    const [taskType, setTaskType] = useState('Jednorazowe');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const newTask = {
            name: DOMPurify.sanitize(taskName),
            description: DOMPurify.sanitize(taskDescription),
            category: taskCategory,
            completed: completedValue === 'Wykonane',
            isDisposable: taskType === 'Jednorazowe'
        };

        console.log("New Task: ", newTask);

        setShowLoading(true); 

        setTimeout(() => {
            onAddTask(newTask);
            setShowLoading(false); 
            setTaskName('');
            setTaskDescription('');
            setTaskCategory('DOM');
            setCompletedValue('Niewykonane');
            setTaskType('Jednorazowe');
        }, 1000); 
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
                    
                    <div className='form-item'>
                        <label>Typ zadania:</label>
                        <Select value={taskType} onChange={(value) => setTaskType(value)} className="form-select">
                            <Option value="Jednorazowe">Jednorazowe</Option>
                            <Option value="Dzienne">Dzienne</Option>
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

                    {showLoading && <img src={loadingPhoto} alt="Loading" className="loading-icon" />} 
                </form>
            </div>
        </div>
    );
}
