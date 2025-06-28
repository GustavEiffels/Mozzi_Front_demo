import React, { useState, useEffect, useRef } from 'react'; 
import './MainHome.css';

function MainHome({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // 메뉴 닫기
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]); 


  const handleCreateEvent = () => {
    alert('이벤트 만들기 페이지로 이동합니다. (실제 라우팅 필요)');
    setIsMenuOpen(false); 
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
    setIsMenuOpen(false); // 메뉴 닫기
  };

  return (
    // menuRef를 햄버거 버튼과 드롭다운 메뉴를 감싸는 최상위 div에 연결합니다.
    // 이렇게 하면 이 div 영역 내에서 발생한 클릭은 메뉴 닫힘을 유발하지 않습니다.
    <div className='container' ref={menuRef}> {/* ref 연결 */}
      {/* 햄버거 메뉴 버튼 */}
      <button className='menu-button' onClick={toggleMenu}>
        <svg className='menu-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
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