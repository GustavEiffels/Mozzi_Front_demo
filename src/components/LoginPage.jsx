import React, { useState } from 'react';
import './LoginPage.css';

import KakaoIcon from '../assets/images/kakao.png';
import GoogleIcon from '../assets/images/google.png';
import NaverIcon from '../assets/images/naver.png'

function LoginPage({ onLoginSuccess }) {
 
  const handleSocialLogin = (provider)=>{
    console.log(`${provider} login`)

    if ( provider === 'Kakao' ){
        const kakaoAuthUrl = "http://localhost:8080/oauth2/authorization/kakao";
        window.location.href = kakaoAuthUrl;
    }

    if (onLoginSuccess) { 
        onLoginSuccess();
      }
  }
  

  return (
    <div className="login-container">
      <h2 className="no-select">Mozzi Room</h2>
      <div className="social-login-section">
        <div className="social-icons">
          <button
            className="social-icon-button no-select kakao-button"
            onClick={() => handleSocialLogin('Kakao')}
            aria-label="카카오톡으로 로그인">
            <img src={KakaoIcon} alt="카카오톡 로고" />
            <span className="social-button-text">카카오 로그인</span>
          </button>
          <button
            className="social-icon-button no-select google-button"
            onClick={() => handleSocialLogin('Google')}
            aria-label="구글로 로그인">
            <img src={GoogleIcon} alt="구글 로고" />
            <span className="social-button-text">구글 로그인</span>
          </button>
          <button
            className="social-icon-button no-select naver-button"
            onClick={() => handleSocialLogin('Naver')}
            aria-label="네이버로 로그인">
            <img src={NaverIcon} alt="네이버 로고" />
            <span className="social-button-text">네이버 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;