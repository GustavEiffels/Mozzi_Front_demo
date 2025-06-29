import React, { useState } from 'react';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryId: '',
    locationId: '',
    name: '',
    content: '',
    startAt: '',
    endAt: '',
    capacity: '',
    approveType: 'AUTO',
    isOnline: false, // 기본값 설정
    locationDetail: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'isOnline' && checked) {
        newFormData.locationDetail = ''; 
      }
      return newFormData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.categoryId) newErrors.categoryId = '카테고리를 선택해주세요.';
    // if (!formData.locationId) newErrors.locationId = '장소를 선택해주세요.'; // locationId는 isOnline과 관계없이 필수라고 가정
    if (!formData.name) newErrors.name = '이벤트명을 입력해주세요.';
    if (!formData.content) newErrors.content = '이벤트 내용을 입력해주세요.';
    if (!formData.startAt) newErrors.startAt = '이벤트 시작 일시를 입력해주세요.';
    if (!formData.endAt) newErrors.endAt = '이벤트 종료 일시를 입력해주세요.';
    if (!formData.capacity || parseInt(formData.capacity) <= 0) newErrors.capacity = '정원은 1 이상이어야 합니다.';

    if (!formData.isOnline && !formData.locationDetail) {
      newErrors.locationDetail = '주소 상세 정보를 입력해주세요.';
    }

    if (formData.startAt && formData.endAt) {
      const start = new Date(formData.startAt);
      const end = new Date(formData.endAt);
      if (start >= end) {
        newErrors.endAt = '종료 일시는 시작 일시보다 늦어야 합니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('폼 데이터:', formData); // 최종 폼 데이터 확인
      alert('이벤트가 성공적으로 생성되었습니다! (실제 API 호출은 없음)');
      navigate('/');
    } else {
      alert('입력된 정보를 확인해주세요.');
    }
  };

  return (
    <div className="create-event-container">
      <h1 className="create-event-title">새 이벤트 만들기</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        {/* <div className="form-group">
          <label htmlFor="categoryId">카테고리</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="1">운동</option>
            <option value="2">스터디</option>
            <option value="3">음악</option>
          </select>
          {errors.categoryId && <p className="error-message">{errors.categoryId}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="locationId">장소</label>
          <select
            id="locationId"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="101">서울 강남구</option>
            <option value="102">서울 마포구</option>
            <option value="201">부산 해운대구</option>
          </select>
          {errors.locationId && <p className="error-message">{errors.locationId}</p>}
        </div> */}

        <div className="form-group">
          <label htmlFor="name">이벤트명</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이벤트 이름을 입력하세요"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="content">이벤트 내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="이벤트 내용을 자세히 입력하세요"
            rows="5"
          ></textarea>
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="startAt">시작 일시</label>
          <input
            type="datetime-local"
            id="startAt"
            name="startAt"
            value={formData.startAt}
            onChange={handleChange}
          />
          {errors.startAt && <p className="error-message">{errors.startAt}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="endAt">종료 일시</label>
          <input
            type="datetime-local"
            id="endAt"
            name="endAt"
            value={formData.endAt}
            onChange={handleChange}
          />
          {errors.endAt && <p className="error-message">{errors.endAt}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="capacity">정원</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="참여 인원"
          />
          {errors.capacity && <p className="error-message">{errors.capacity}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="approveType">승인 타입</label>
          <select
            id="approveType"
            name="approveType"
            value={formData.approveType}
            onChange={handleChange}
          >
            <option value="AUTO">자동 승인</option>
            <option value="MANUAL">수동 승인</option>
          </select>
          {errors.approveType && <p className="error-message">{errors.approveType}</p>}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isOnline"
            name="isOnline"
            checked={formData.isOnline}
            onChange={handleChange}
          />
          <label htmlFor="isOnline">온라인 모임입니다</label>
        </div>

        <div className="form-group">
          <label htmlFor="locationDetail">상세 주소</label>
          <input
            type="text"
            id="locationDetail"
            name="locationDetail"
            value={formData.locationDetail}
            onChange={handleChange}
            placeholder="상세 주소를 입력하세요"
            disabled={formData.isOnline} // isOnline이 true이면 비활성화
          />
          {/* isOnline이 false일 때만 유효성 검사 메시지 표시 */}
          {!formData.isOnline && errors.locationDetail && (
            <p className="error-message">{errors.locationDetail}</p>
          )}
        </div>

        <button type="submit" className="submit-button">이벤트 생성</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/')}>취소</button>
      </form>
    </div>
  );
}

export default CreateEvent;