import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyEventsPage.css'; // MyEventsPage 전용 CSS

// Dummy Reservation Status Enum (for demonstration)
const ReservationStatus = {
  RESERVED: "예약 완료",
  CANCELLED: "취소됨",
  COMPLETED: "참석 완료",
  PENDING: "승인 대기중",
};

// 더미 예약 이벤트 데이터 (이전과 동일하게 유지)
const DUMMY_RESERVED_EVENTS = [
  {
    reservationId: 1,
    eventId: 101,
    name: "주말 등산 모임 (예약됨)",
    content: "북한산 주말 등산 같이 하실 분! 초보자 환영입니다.",
    startAt: "2025-07-06T09:00:00",
    endAt: "2025-07-06T14:00:00",
    locationDetail: "북한산 입구",
    isOnline: false,
    status: ReservationStatus.COMPLETED, // Completed event
    hostName: 12345,
    cancellable: false,
  },
  {
    reservationId: 2,
    eventId: 102,
    name: "온라인 코딩 스터디 (예약됨)",
    content: "리액트 기초 온라인 스터디입니다. 함께 성장해요!",
    startAt: "2025-07-08T19:00:00",
    endAt: "2025-07-08T21:00:00",
    locationDetail: "온라인",
    isOnline: true,
    status: ReservationStatus.COMPLETED, // Completed event
    hostName: 12346,
    cancellable: false,
  },
  {
    reservationId: 3,
    eventId: 103,
    name: "독서 토론 모임 (예약됨)",
    content: "이달의 책 '데미안' 토론! 깊이 있는 대화를 나눠요.",
    startAt: "2025-07-15T14:00:00", // Future event
    endAt: "2025-07-15T16:00:00",
    locationDetail: "강남 스터디룸",
    isOnline: false,
    status: ReservationStatus.RESERVED, // Currently reserved
    hostName: 12347,
    cancellable: true,
  },
  {
    reservationId: 4,
    eventId: 104,
    name: "온라인 게임 대회 (예약됨)",
    content: "리그 오브 레전드 친선전! 실력을 뽐내보세요.",
    startAt: "2025-07-20T18:00:00", // Future event
    endAt: "2025-07-20T22:00:00",
    locationDetail: "온라인",
    isOnline: true,
    status: ReservationStatus.RESERVED, // Currently reserved
    hostName: 12348,
    cancellable: true,
  },
  {
    reservationId: 5,
    eventId: 105,
    name: "과거 테스트 이벤트",
    content: "이것은 이미 지난 이벤트입니다. 즐거운 시간이었어요.",
    startAt: "2025-06-01T10:00:00",
    endAt: "2025-06-01T12:00:00",
    locationDetail: "과거 장소",
    isOnline: false,
    status: ReservationStatus.COMPLETED,
    hostName: 12349,
    cancellable: false,
  },
  {
    reservationId: 6,
    eventId: 106,
    name: "진행 중인 테스트 이벤트",
    content: "이것은 현재 진행 중인 이벤트입니다. 참여해볼까요?",
    startAt: "2025-07-13T22:00:00", // Current time is 2025-07-13 22:32:31 KST
    endAt: "2025-07-13T23:00:00",
    locationDetail: "현재 장소",
    isOnline: true,
    status: ReservationStatus.RESERVED,
    hostName: 12350,
    cancellable: true,
  },
  // 스크롤 테스트를 위한 더미 데이터 추가
  {
    reservationId: 7,
    eventId: 107,
    name: "스크롤 테스트 이벤트 1",
    content: "이벤트 목록 스크롤 테스트를 위한 이벤트입니다.",
    startAt: "2025-07-22T10:00:00",
    endAt: "2025-07-22T11:00:00",
    locationDetail: "온라인",
    isOnline: true,
    status: ReservationStatus.RESERVED,
    hostName: 12351,
    cancellable: true,
  },
  {
    reservationId: 8,
    eventId: 108,
    name: "스크롤 테스트 이벤트 2",
    content: "이벤트 목록 스크롤 테스트를 위한 이벤트입니다.",
    startAt: "2025-07-23T14:00:00",
    endAt: "2025-07-23T16:00:00",
    locationDetail: "강남",
    isOnline: false,
    status: ReservationStatus.RESERVED,
    hostName: 12352,
    cancellable: true,
  },
  {
    reservationId: 9,
    eventId: 109,
    name: "스크롤 테스트 이벤트 3",
    content: "이벤트 목록 스크롤 테스트를 위한 이벤트입니다.",
    startAt: "2025-07-24T19:00:00",
    endAt: "2025-07-24T21:00:00",
    locationDetail: "온라인",
    isOnline: true,
    status: ReservationStatus.PENDING,
    hostName: 12353,
    cancellable: true,
  },
  {
    reservationId: 10,
    eventId: 110,
    name: "과거 스크롤 테스트 이벤트",
    content: "이것은 이미 지난 이벤트입니다. 즐거운 시간이었어요.",
    startAt: "2025-05-10T09:00:00",
    endAt: "2025-05-10T11:00:00",
    locationDetail: "강의실",
    isOnline: false,
    status: ReservationStatus.COMPLETED,
    hostName: 12354,
    cancellable: false,
  },
  {
    reservationId: 11,
    eventId: 111,
    name: "과거 스크롤 테스트 이벤트 2",
    content: "이것은 지난 스크롤 테스트 이벤트입니다.",
    startAt: "2025-05-15T13:00:00",
    endAt: "2025-05-15T15:00:00",
    locationDetail: "카페",
    isOnline: false,
    status: ReservationStatus.COMPLETED,
    hostName: 12355,
    cancellable: false,
  },
];

function MyEventsPage() {
  const navigate = useNavigate();
  const [pastReservations, setPastReservations] = useState([]);
  const [currentAndFutureReservations, setCurrentAndFutureReservations] = useState([]);

  useEffect(() => {
    const now = new Date();

    const past = DUMMY_RESERVED_EVENTS.filter(event => {
      const end = new Date(event.endAt);
      return end < now; // 종료 시간이 현재보다 이전인 경우
    }).sort((a, b) => new Date(b.startAt) - new Date(a.startAt)); // 최신순으로 정렬 (지난 이벤트는 보통 최신순)

    const currentAndFuture = DUMMY_RESERVED_EVENTS.filter(event => {
      const start = new Date(event.startAt);
      return (start > now) || (now >= start && now <= new Date(event.endAt));
    }).sort((a, b) => new Date(a.startAt) - new Date(b.startAt)); // 오래된 순으로 정렬 (예정된 이벤트는 보통 다가오는 순)

    setPastReservations(past);
    setCurrentAndFutureReservations(currentAndFuture);
  }, []);

  const handleBack = () => {
    navigate('/event-list');
  };

  const handleCancelReservation = (reservationId, eventName) => {
    if (window.confirm(`'${eventName}' 예약을 취소하시겠습니까?`)) {
      // 실제 취소 로직 (API 호출 등)을 여기에 구현
      alert(`예약 ID ${reservationId}를 취소했습니다.`);
      // 취소 후 상태 업데이트를 위해 페이지 새로고침 또는 상태 변경 로직 추가
      // 예: setDUMMY_RESERVED_EVENTS에서 해당 예약 제거 후 필터링 재실행
      window.location.reload(); // 간단한 예시로 페이지 새로고침
    }
  };

  return (
    <div className="my-events-container">
      <h1 className="my-events-title">나의 이벤트</h1>

      <div className="my-events-section">
        <h2 className="section-title">현재 예약된 이벤트</h2>
        <div className="event-list-scroll-area"> {/* 스크롤 영역 div */}
          {currentAndFutureReservations.length > 0 ? (
            <ul className="event-list">
              {currentAndFutureReservations.map(event => (
                <li key={event.reservationId} className={`event-item ${event.cancellable ? 'cancellable-item' : ''}`}>
                  <strong>{event.name}</strong>
                  <p>내용: {event.content}</p>
                  <p>날짜: {new Date(event.startAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>시간: {new Date(event.startAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(event.endAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                  <p>장소: {event.isOnline ? '온라인' : event.locationDetail}</p>
                  <p>상태: {event.status}</p>
                  {/* <p>취소 가능: {event.cancellable ? '예' : '아니오'}</p> 이 줄을 제거합니다. */}
                  {event.cancellable && (
                    <div className="cancel-button-overlay"> {/* 취소 버튼 오버레이 */}
                      <button
                        className="cancel-button"
                        onClick={(e) => {
                          e.stopPropagation(); // 이벤트 버블링 방지
                          handleCancelReservation(event.reservationId, event.name);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-events-message">현재 예약된 이벤트가 없습니다.</p>
          )}
        </div>
      </div>

      <div className="my-events-section">
        <h2 className="section-title">지난 예약 내역</h2>
        <div className="event-list-scroll-area"> {/* 스크롤 영역 div */}
          {pastReservations.length > 0 ? (
            <ul className="event-list">
              {pastReservations.map(event => (
                <li key={event.reservationId} className="event-item past">
                  <strong>{event.name}</strong>
                  <p>내용: {event.content}</p>
                  <p>날짜: {new Date(event.startAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>시간: {new Date(event.startAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(event.endAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                  <p>장소: {event.isOnline ? '온라인' : event.locationDetail}</p>
                  <p>상태: {event.status}</p>
                  {/* <p>취소 가능: {event.cancellable ? '예' : '아니오'}</p> 이 줄을 제거합니다. */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-events-message">지난 예약 내역이 없습니다.</p>
          )}
        </div>
      </div>

      <button className="back-to-list-button" onClick={handleBack}>이벤트 목록으로 돌아가기</button>
    </div>
  );
}

export default MyEventsPage;