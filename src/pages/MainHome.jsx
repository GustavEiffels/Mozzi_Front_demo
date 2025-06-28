import React from 'react';
import './MainHome.css';

function MainHome() {
  const handleCreateEvent = () => {
    alert('이벤트 만들기 페이지로 이동합니다. (실제 라우팅 필요)');
  };

  const handleJoinEvent = () => {
    alert('이벤트 참석하기 페이지로 이동합니다. (실제 라우팅 필요)');
  };

  return (
    <div className='container'>
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