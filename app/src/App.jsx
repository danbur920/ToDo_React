import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasksFromAPI } from './actions/actions';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddTaskPage from './components/AddTaskPage';
import TaskList from './components/TaskList';
import './scss/App.scss';
import logo from './icons/logo.svg';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksFromAPI());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
            <header className="App-header">
    <div>
        <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
    </div>
    <nav className="nav-links-container">
        <Link to="/" className="nav-link">
            <button className="styled-button">Strona główna</button>
        </Link>
        <Link to="/add-task" className="nav-link">
            <button className="styled-button">Dodaj zadanie</button>
        </Link>
        <Link to="/tasks" className="nav-link">
            <button className="styled-button">Zadania</button>
        </Link>
    </nav>
</header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-task" element={<AddTaskPage />} />
                    <Route path="/tasks" element={<TaskList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
