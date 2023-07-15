'use client'
import React, { useState } from 'react'


import LoginForm from '@/components/LoginForm/LoginForm'
import RegisterForm from '@/components/RegisterForm/RegisterForm'

import styles from './page.module.css';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [isResetingPassword, setIsResetingPassword] = useState(false);

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering)
    setIsResetingPassword(false);

  }

  const handleToggleResetForm = () => {
    setIsResetingPassword(!isResetingPassword);
    setIsRegistering(false);
  };

  return (
    <div className={styles.container}>
      {isResetingPassword ? (
        <ResetPasswordForm onLogin={handleToggleForm} />
      ) : isRegistering ? (
        <RegisterForm onLogin={handleToggleForm} />
      ) : (
        <LoginForm onRegister={handleToggleForm} onForgotPassword={handleToggleResetForm} />
      )}
    </div>
  )
}

export default AuthPage;