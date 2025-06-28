// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // React Router import

import LoginPage from './components/LoginPage';
import MainHome from './pages/MainHome'; 
import CreateEvent from './pages/CreateEvent'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <MainHome onLogout={handleLogout} />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/create-event"
            element={isLoggedIn ? <CreateEvent /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
