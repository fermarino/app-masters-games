'use client'
import React, { useState } from 'react'


import LoginForm from '@/components/LoginForm/LoginForm'
import RegisterForm from '@/components/RegisterForm/RegisterForm'

import styles from './page.module.css';

const AuthPage = () => {
  const [isRegistering, setisRegistering] = useState(false)

  const handleToggleForm = () => {
    setisRegistering(!isRegistering)
  }
  
  return (
    <div className={styles.container}>
      {isRegistering ? (
        <RegisterForm onLogin={handleToggleForm} />
      ) : (
        <LoginForm onRegister={handleToggleForm} />
      )}
    </div>
  )
}

export default AuthPage;