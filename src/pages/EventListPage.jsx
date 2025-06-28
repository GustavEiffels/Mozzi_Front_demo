// src/components/EventListPage.js
import React, { useState, useEffect } from 'react';
import './EventListPage.css'; // 새로운 CSS 파일 (아래에서 생성)
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅

// 더미 이벤트 데이터 (실제로는 API에서 가져옴)
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

function EventListPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달력의 기준 날짜 (월/년도)
  const [selectedDate, setSelectedDate] = useState(null); // 사용자가 선택한 달력 날짜
  const [ongoingEvents, setOngoingEvents] = useState([]); // 현재 진행 중인 이벤트 목록
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]); // 선택된 날짜의 이벤트 목록

  useEffect(() => {
    // 현재 진행 중인 이벤트 필터링
    const now = new Date();
    const ongoing = DUMMY_EVENTS.filter(event => {
      const start = new Date(event.startAt);
      const end = new Date(event.endAt);
      return now >= start && now <= end;
    });
    setOngoingEvents(ongoing);

    // 컴포넌트 로드 시 오늘 날짜의 이벤트를 기본으로 표시
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    // selectedDate가 변경될 때마다 해당 날짜의 이벤트 필터링
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

  // 달력 날짜 클릭 핸들러
  const handleDateClick = (day) => {
    if (day) {
      const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newSelectedDate);
    } else {
      setSelectedDate(null); // 날짜 클릭 해제 또는 초기화
    }
  };

  // 달력 렌더링 함수
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 해당 월 1일의 요일 (0=일, 6=토)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날짜

    const calendarDays = [];
    // 이전 달의 빈 공간 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    // 현재 달의 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    const rows = [];
    let cells = [];

    calendarDays.forEach((day, index) => {
      const isToday = selectedDate && year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate();
      const hasEvent = day && DUMMY_EVENTS.some(event => {
        const eventDate = new Date(event.startAt);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day;
      });

      cells.push(
        <td
          key={index}
          className={`calendar-day ${day ? '' : 'empty'} ${isToday ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
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

    // 마지막 주 채우기
    if (cells.length > 0) {
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

  // 월 변경 핸들러
  const changeMonth = (delta) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + delta);
      return newDate;
    });
  };

  return (
    <div className="event-list-container">
      <h1 className="page-title">이벤트 참석하기</h1>

      <div className="content-wrapper">
        <div className="calendar-section">
          <h2>
            <button onClick={() => changeMonth(-1)} className="nav-button">&lt;</button>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            <button onClick={() => changeMonth(1)} className="nav-button">&gt;</button>
          </h2>
          {renderCalendar()}
        </div>

        <div className="event-details-section">
          <div className="event-list-card">
            <h3>현재 진행 중인 이벤트</h3>
            {ongoingEvents.length > 0 ? (
              <ul>
                {ongoingEvents.map(event => (
                  <li key={event.id} className="event-item">
                    <strong>{event.name}</strong>
                    <p>{event.content}</p>
                    <p>시간: {new Date(event.startAt).toLocaleString()} - {new Date(event.endAt).toLocaleTimeString()}</p>
                    <p>장소: {event.locationDetail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>현재 진행 중인 이벤트가 없습니다.</p>
            )}
          </div>

          <div className="event-list-card">
            <h3>
              {selectedDate
                ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 이벤트`
                : '날짜를 선택해주세요'}
            </h3>
            {eventsForSelectedDate.length > 0 ? (
              <ul>
                {eventsForSelectedDate.map(event => (
                  <li key={event.id} className="event-item">
                    <strong>{event.name}</strong>
                    <p>{event.content}</p>
                    <p>시간: {new Date(event.startAt).toLocaleTimeString()} - {new Date(event.endAt).toLocaleTimeString()}</p>
                    <p>장소: {event.locationDetail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              selectedDate && <p>{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일에는 이벤트가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>메인으로 돌아가기</button>
    </div>
  );
}

export default EventListPage;
