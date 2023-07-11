'use client'
import React from 'react'

import Register from '@/components/RegisterForm/SignUp';
import styles from './page.module.css'

const Login = () => {

  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}

export default Login