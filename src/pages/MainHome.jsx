// src/pages/MainHome.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHome.css';
import EventListPage from './EventListPage'; // EventListPage를 MainHome 안에서 사용하기 위해 import

function MainHome({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // useNavigate는 EventListPage의 '메인으로 돌아가기' 버튼이 다시 MainHome의 시작 화면으로 돌아올 때 필요합니다.

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
      onLogout(); // App.js로 로그아웃 상태 변경 전달
    }
    setIsMenuOpen(false);
  };

  const handleChangeUserInfo = () => {
    alert('개인정보 변경 페이지로 이동합니다. (실제 라우팅 필요)');
    setIsMenuOpen(false);
  };

  return (
    <div className='container' ref={menuRef}>
      {/* 햄버거 메뉴 및 드롭다운 유지 */}
      <button className='menu-button' onClick={toggleMenu}>
        <svg className='menu-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <ul className={`dropdown-menu ${isMenuOpen ? '' : 'hidden'}`}>
        <li className='dropdown-item' onClick={handleChangeUserInfo}>개인정보 변경</li>
        <li className='dropdown-item' onClick={handleLogout}>로그아웃</li>
      </ul>

      {/* MainHome의 주요 내용 자리에 EventListPage를 렌더링 */}
      {/* EventListPage에 onLogout 프롭을 전달하여 햄버거 메뉴의 로그아웃 기능을 EventListPage 안에서 사용할 수 있게 합니다. */}
      <EventListPage onLogout={onLogout} />
      {/* 이제 MainHome의 원래 내용 (무엇을 하시겠어요? 버튼들)은 필요 없으므로 제거합니다. */}
    </div>
  );
}

export default MainHome;