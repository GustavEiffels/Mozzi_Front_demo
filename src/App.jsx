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
          {/* '/' 경로: 로그인 상태에 따라 LoginPage 또는 EventListPage 렌더링 */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                // 로그인 성공 시 EventListPage를 메인 페이지로 렌더링합니다.
                // EventListPage로 onLogout 핸들러를 전달합니다.
                <EventListPage onLogout={handleLogout} />
              ) : (
                // 로그인되지 않았으면 LoginPage로 이동합니다.
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* '/create-event' 경로: 로그인 상태 확인 후 CreateEvent 렌더링 */}
          <Route
            path="/create-event"
            element={isLoggedIn ? <CreateEvent /> : <Navigate to="/" replace />}
          />

          {/* '/join-event' 경로는 이제 EventListPage가 '/'에서 렌더링되므로 중복될 수 있습니다. */}
          {/* 필요 없다면 제거하거나, 예를 들어 '특정 필터가 적용된 이벤트 목록'과 같이 다른 용도로 재정의할 수 있습니다. */}
          {/* 현재 요구사항에 따르면 이 라우트는 제거하는 것이 좋습니다. */}
          {/* <Route
            path="/join-event"
            element={isLoggedIn ? <EventListPage /> : <Navigate to="/" replace />}
          /> */}

          {/* '/event/:eventId' 경로: 로그인 상태 확인 후 EventDetailPage 렌더링 */}
          <Route
            path="/event/:eventId"
            element={isLoggedIn ? <EventDetailPage /> : <Navigate to="/" replace />}
          />

          <Route path="/my-events" element={<MyEventsPage />} /> {/* New Route for MyEventsPage */}

          {/* 정의되지 않은 모든 경로를 '/'로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;