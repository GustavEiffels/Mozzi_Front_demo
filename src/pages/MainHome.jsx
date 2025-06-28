import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './MainHome.css';

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


  const handleCreateEvent = () => {
    setIsMenuOpen(false); 
    navigate('/create-event'); 
  };

  const handleJoinEvent = () => {
    alert('이벤트 참석하기 페이지로 이동합니다. (실제 라우팅 필요)');
    setIsMenuOpen(false);
  };

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

  return (
    <div className='container' ref={menuRef}> 
      <button className='menu-button' onClick={toggleMenu}>
        <svg className='menu-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <ul className={`dropdown-menu ${isMenuOpen ? '' : 'hidden'}`}>
        <li className='dropdown-item' onClick={handleChangeUserInfo}>개인정보 변경</li>
        <li className='dropdown-item' onClick={handleLogout}>로그아웃</li>
      </ul>

      <h1 className='title'>무엇을 하시겠어요?</h1>
      <div className='buttonGroup'>
        <button
          onClick={handleCreateEvent}
          className='button'
        >
          이벤트 만들기
        </button>
        <button
          onClick={handleJoinEvent}
          className='button'
        >
          이벤트 참석하기
        </button>
      </div>
    </div>
  );
}

export default MainHome;