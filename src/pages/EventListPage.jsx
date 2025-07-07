// src/pages/EventListPage.js
import React, { useState, useEffect, useRef } from 'react'; // useRef import 추가
import './EventListPage.css'; // EventListPage 전용 CSS
import { useNavigate } from 'react-router-dom';

// 더미 이벤트 데이터 (이전과 동일하게 유지)
const DUMMY_EVENTS = [
  {
    id: 1,
    name: "주말 등산 모임",
    content: "북한산 주말 등산 같이 하실 분!",
    startAt: "2025-07-06T09:00:00",
    endAt: "2025-07-06T14:00:00",
    locationDetail: "북한산 입구",
    isOnline: false,
  },
  {
    id: 2,
    name: "온라인 코딩 스터디",
    content: "리액트 기초 온라인 스터디입니다.",
    startAt: "2025-07-08T19:00:00",
    endAt: "2025-07-08T21:00:00",
    locationDetail: "온라인",
    isOnline: true,
  },
  {
    id: 3,
    name: "독서 토론 모임",
    content: "이달의 책 '데미안' 토론!",
    startAt: "2025-07-15T14:00:00",
    endAt: "2025-07-15T16:00:00",
    locationDetail: "강남 스터디룸",
    isOnline: false,
  },
  {
    id: 4,
    name: "요가 클래스",
    content: "초보자를 위한 요가 클래스",
    startAt: "2025-07-06T10:00:00",
    endAt: "2025-07-06T11:00:00",
    locationDetail: "종로 요가 스튜디오",
    isOnline: false,
  },
  {
    id: 5,
    name: "영화 감상 모임",
    content: "이번 주 개봉작 '인사이드 아웃 2' 감상",
    startAt: "2025-07-10T19:00:00",
    endAt: "2025-07-10T22:00:00",
    locationDetail: "CGV 홍대",
    isOnline: false,
  },
  {
    id: 6,
    name: "온라인 게임 대회",
    content: "리그 오브 레전드 친선전",
    startAt: "2025-07-20T18:00:00",
    endAt: "2025-07-20T22:00:00",
    locationDetail: "온라인",
    isOnline: true,
  },
];

// EventListPage는 onLogout prop을 받습니다.
function EventListPage({ onLogout }) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달력의 기준 날짜 (월/년도)
  const [selectedDate, setSelectedDate] = useState(null); // 사용자가 선택한 달력 날짜
  const [ongoingEvents, setOngoingEvents] = useState([]); // 현재 진행 중인 이벤트 목록
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]); // 선택된 날짜의 이벤트 목록

  // 햄버거 메뉴 관련 상태 및 ref 추가 (MainHome에서 옮겨옴)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 햄버거 메뉴 외부 클릭 감지 useEffect (MainHome에서 옮겨옴)
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

  // 햄버거 메뉴 토글 함수 (MainHome에서 옮겨옴)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 개인정보 변경 핸들러 (MainHome에서 옮겨옴)
  const handleChangeUserInfo = () => {
    alert('개인정보 변경 페이지로 이동합니다. (실제 라우팅 필요)');
    setIsMenuOpen(false);
  };

  // 로그아웃 핸들러 (MainHome에서 옮겨옴, App.js의 onLogout 호출)
  const handleLogoutFromMenu = () => {
    if (onLogout) {
      onLogout(); // App.js에서 전달받은 onLogout 함수 호출
    }
    setIsMenuOpen(false);
    // 로그아웃 후 로그인 페이지로 이동하는 로직은 App.js의 handleLogout이 담당
  };

  // 컴포넌트 마운트 시 및 selectedDate 변경 시 이벤트 필터링 로직 (기존과 동일)
  useEffect(() => {
    const now = new Date(); // 현재 시간
    const ongoing = DUMMY_EVENTS.filter(event => {
      const start = new Date(event.startAt);
      const end = new Date(event.endAt);
      return now >= start && now <= end; // 시작 시간 <= 현재 시간 <= 종료 시간
    });
    setOngoingEvents(ongoing);

    // 컴포넌트 로드 시 (또는 페이지 진입 시) 오늘 날짜의 이벤트를 기본으로 표시
    setSelectedDate(new Date());
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때만 실행

  useEffect(() => {
    if (selectedDate) {
      const events = DUMMY_EVENTS.filter(event => {
        const eventDate = new Date(event.startAt);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      });
      setEventsForSelectedDate(events);
    } else {
      setEventsForSelectedDate([]);
    }
  }, [selectedDate]); // selectedDate가 변경될 때마다 실행

  const handleDateClick = (day) => {
    if (day) {
      const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newSelectedDate);
    } else {
      setSelectedDate(null);
    }
  };

  // 이벤트 항목 클릭 시 상세 페이지로 이동
  const handleEventItemClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // 달력 렌더링 로직 (기존과 동일)
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 해당 월의 첫 날 요일 (0:일, 1:월 ...)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날 (총 일수)

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null); // 빈 칸 채우기
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i); // 날짜 채우기
    }

    const rows = [];
    let cells = [];

    calendarDays.forEach((day, index) => {
      const today = new Date(); // 실제 오늘 날짜
      const isCurrentRealToday = day === today.getDate() &&
                                 month === today.getMonth() &&
                                 year === today.getFullYear();

      const isSelectedDay = selectedDate && // 선택된 날짜가 있고
                            day === selectedDate.getDate() &&
                            month === selectedDate.getMonth() &&
                            year === selectedDate.getFullYear();

      // 해당 날짜에 이벤트가 있는지 확인
      const hasEvent = day && DUMMY_EVENTS.some(event => {
        const eventDate = new Date(event.startAt);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day;
      });

      cells.push(
        <td
          key={index}
          className={`calendar-day ${day ? '' : 'empty'} ${isSelectedDay ? 'selected' : ''} ${hasEvent ? 'has-event' : ''} ${isCurrentRealToday ? 'current-real-today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </td>
      );

      if (cells.length === 7) {
        rows.push(<tr key={rows.length}>{cells}</tr>);
        cells = [];
      }
    });

    if (cells.length > 0) { // 마지막 줄 채우기
      while (cells.length < 7) {
        cells.push(<td key={cells.length} className="calendar-day empty"></td>);
      }
      rows.push(<tr key={rows.length}>{cells}</tr>);
    }

    return (
      <table className="calendar-table">
        <thead>
          <tr>
            <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  };

  // 월 변경 함수 (기존과 동일)
  const changeMonth = (delta) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + delta);
      const today = new Date(); // 실제 오늘 날짜로 돌아갈 로직
      if (newDate.getFullYear() === today.getFullYear() && newDate.getMonth() === today.getMonth()) {
        setSelectedDate(today); // 현재 달로 돌아오면 오늘 날짜 선택
      } else {
        setSelectedDate(null); // 다른 달로 이동하면 선택 해제
      }
      return newDate;
    });
  };

  return (
    <div className="event-list-container" ref={menuRef}> {/* 햄버거 메뉴를 위해 ref 연결 */}
      {/* 햄버거 메뉴 버튼 (MainHome에서 옮겨옴) */}
      <button className='menu-button' onClick={toggleMenu} style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <svg className='menu-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 햄버거 메뉴 드롭다운 (MainHome에서 옮겨옴) */}
      <ul className={`dropdown-menu ${isMenuOpen ? '' : 'hidden'}`} style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: 'white', border: '1px solid #ccc', listStyle: 'none', padding: '10px', zIndex: 100, borderRadius: '4px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <li className='dropdown-item' onClick={handleChangeUserInfo} style={{ padding: '8px 12px', cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}>개인정보 변경</li>
        <li className='dropdown-item' onClick={handleLogoutFromMenu} style={{ padding: '8px 12px', cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}>로그아웃</li>
      </ul>

      {/* 페이지 제목 */}
      <h1 className="page-title">이벤트 참석하기</h1>

      <div className="content-wrapper">
        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)} className="nav-button">&lt;</button>
            <h2 className="current-month-year">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
            <button onClick={() => changeMonth(1)} className="nav-button">&gt;</button>
          </div>
          {renderCalendar()}
        </div>

        <div className="event-details-section">
          {/* 현재 진행 중인 이벤트 섹션 */}
          <div className="event-list-card">
            <h3>현재 진행 중인 이벤트</h3>
            {ongoingEvents.length > 0 ? (
              <ul>
                {ongoingEvents.map(event => (
                  <li key={event.id} className="event-item clickable" onClick={() => handleEventItemClick(event.id)}>
                    <strong>{event.name}</strong>
                    <p>{event.content}</p>
                    <p>시간: {new Date(event.startAt).toLocaleString()} - {new Date(event.endAt).toLocaleTimeString()}</p>
                    <p>장소: {event.isOnline ? '온라인' : event.locationDetail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>현재 진행 중인 이벤트가 없습니다.</p>
            )}
          </div>

          {/* 선택된 날짜의 이벤트 섹션 */}
          <div className="event-list-card">
            <h3>
              {selectedDate
                ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 이벤트`
                : '날짜를 선택해주세요'}
            </h3>
            {eventsForSelectedDate.length > 0 ? (
              <ul>
                {eventsForSelectedDate.map(event => (
                  <li key={event.id} className="event-item clickable" onClick={() => handleEventItemClick(event.id)}>
                    <strong>{event.name}</strong>
                    <p>{event.content}</p>
                    <p>시간: {new Date(event.startAt).toLocaleTimeString()} - {new Date(event.endAt).toLocaleTimeString()}</p>
                    <p>장소: {event.isOnline ? '온라인' : event.locationDetail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              selectedDate && <p>{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일에는 이벤트가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      {/* '메인으로 돌아가기' 버튼은 이제 EventListPage 자체가 메인 페이지이므로 제거하는 것이 자연스럽습니다. */}
      {/* <button className="back-button" onClick={() => navigate('/')}>메인으로 돌아가기</button> */}
    </div>
  );
}

export default EventListPage;