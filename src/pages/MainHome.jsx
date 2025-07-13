// src/pages/MainHome.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHome.css';
import EventListPage from './EventListPage';

function MainHome({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); 
    }
    setIsMenuOpen(false);
  };

  const handleChangeUserInfo = () => {
    alert('개인정보 변경 페이지로 이동합니다. (실제 라우팅 필요)');
    setIsMenuOpen(false);
  };

  const handleChangeReservationInfo = () => {
    alert('Reservation Info')
    setIsMenuOpen(false)
  }

  return (
    <div className='container' ref={menuRef}>
      <button className='menu-button' onClick={toggleMenu}>
        <svg className='menu-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <ul className={`dropdown-menu ${isMenuOpen ? '' : 'hidden'}`}>
        <li className='dropdown-item' onClick={handleChangeUserInfo}>개인정보 변경</li>
        <li className='dropdown-item' onClick={handleChangeReservationInfo}>예약한 이벤트</li>
        <li className='dropdown-item' onClick={handleLogout}>로그아웃</li>
      </ul>
      <EventListPage onLogout={onLogout} />
    </div>
  );
}

export default MainHome;