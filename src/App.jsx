import './App.css'
import React, { useState } from 'react';
import LoginPage from './components/LoginPage'
import MainHome from './pages/MainHome';
function App() {

   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MainHome/>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
