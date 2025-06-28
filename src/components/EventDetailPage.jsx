import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'; 

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

function EventDetailPage() {
  const { eventId } = useParams(); 
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // 실제 API 호출 대신 더미 데이터에서 이벤트 찾기
    const foundEvent = DUMMY_EVENTS.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      alert('이벤트를 찾을 수 없습니다.');
      navigate('/join-event'); 
    }
  }, [eventId, navigate]);

  if (!event) {
    return <div className="event-detail-container loading">이벤트 정보를 불러오는 중...</div>;
  }

  const formatDateTime = (isoString) => {
    if (!isoString) return '정보 없음';
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24시간 형식
    });
  };

  return (
    <div className="event-detail-container">
      <h1 className="event-detail-title">이벤트 상세</h1>
      <div className="event-detail-card">
        <h2>{event.name}</h2>
        <p className="detail-content">{event.content}</p>
        <div className="detail-info-group">
          <p><strong>시작:</strong> {formatDateTime(event.startAt)}</p>
          <p><strong>종료:</strong> {formatDateTime(event.endAt)}</p>
          <p><strong>장소:</strong> {event.isOnline ? '온라인' : event.locationDetail}</p>
          <p><strong>참여 정원:</strong> {event.capacity}명</p>
        </div>
        <div className="detail-actions">
          <button className="join-button">참가 신청</button>
          <button className="back-button" onClick={() => navigate('/join-event')}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
