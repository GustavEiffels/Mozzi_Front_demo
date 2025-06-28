import React, { useState } from 'react';
import './LoginPage.css';

import KakaoIcon from '../assets/images/kakao.png';
import GoogleIcon from '../assets/images/google.png';
import NaverIcon from '../assets/images/naver.png'

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('example@email.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (email === 'example@email.com' && password === 'password123') {

      if (onLoginSuccess) { 
        onLoginSuccess();
      }
      setError('');
    } else {
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2 class="no-select">Mozzi Room</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" class="no-select">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" class="no-select">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="6자 이상의 비밀번호를 입력하세요" 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button no-select">로그인</button>

        <div className="extra-links">
          <a href="#비밀번호찾기" className="no-select">비밀번호 찾기</a>
          <span className="separator">|</span>
          <a href="#회원가입" className="no-select">회원가입</a>
          <span className="separator">|</span>
          <a href="#아이디찾기" className="no-select">아이디(이메일) 찾기</a>
        </div>

          <div className="social-icons">
            <button className="social-icon-button no-select">
              <img src={KakaoIcon} alt="Kakao 로그인" />
            </button>
            <button className="social-icon-button no-select">
              <img src={GoogleIcon} alt="Google 로그인" />
            </button>
            <button className="social-icon-button no-select">
              <img src={NaverIcon} alt="네이버 로그인" /> {/* 이미지 참고 */}
            </button>
          </div>        

      </form>
    </div>
  );
}

export default LoginPage;