'use client'
import Login from '@/components/LoginForm/LoginForm';
import Register from '@/components/RegisterForm/SignUp';
import styles from './page.module.css';
import React, { useState } from 'react';

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className={styles.container}>
      {showLogin ? (
        <Login onRegister={handleRegisterClick} />
      ) : (
        <Register onLogin={handleLoginClick} />
      )}
    </div>
  );
}
