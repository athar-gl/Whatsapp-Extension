import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './popup.css'; // Import the CSS file

const Tab = ({ userName, isActive, onClick }) => (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
        {userName}
    </div>
);

const App = () => {
    const [usersData, setUsersData] = useState([]);
    const [activeUser, setActiveUser] = useState(usersData[0] || {}); // Set a default value

    useEffect(() => {
        // Fetch usersData from chrome.storage.local
        chrome.storage.local.get(['usersData'], (result) => {
            const storedUsersData = result.usersData || [];
            setUsersData(storedUsersData);
        });
    }, []);

    const handleUserClick = (user) => {
        setActiveUser(user);
    };

    return (
        <div className="app">
            <div className="tabs-container">
                {usersData.map((user, index) => (
                    <Tab
                        key={index}
                        userName={user.userName}
                        isActive={user === activeUser}
                        onClick={() => handleUserClick(user)}
                    />
                ))}
            </div>
            <div className="content">
                {activeUser.content}
            </div>
        </div>
    );
};

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);
ReactDOM.render(<App />, root);
