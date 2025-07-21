// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import CreateEvent from './pages/CreateEvent';
import EventListPage from './pages/EventListPage'; // EventListPage를 메인 경로에 연결
import EventDetailPage from './components/EventDetailPage';
import MyEventsPage from './pages/MyEventsPage'; 

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

                <EventListPage onLogout={handleLogout} />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route
            path="/create-event"
            element={isLoggedIn ? <CreateEvent /> : <Navigate to="/" replace />}
          />


          <Route
            path="/event/:eventId"
            element={isLoggedIn ? <EventDetailPage /> : <Navigate to="/" replace />}
          />

          <Route path="/my-events" element={<MyEventsPage />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;