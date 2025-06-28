// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import MainHome from './pages/MainHome';
import CreateEvent from './pages/CreateEvent';
import EventListPage from './pages/EventListPage'; // EventListPage 컴포넌트 임포트

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
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
          {/* 이벤트 참석하기 페이지 라우트 추가 */}
          <Route
            path="/join-event"
            element={isLoggedIn ? <EventListPage /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
