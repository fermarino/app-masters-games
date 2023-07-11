'use client'
import Login from '@/components/LoginForm/LoginForm';
import Register from '@/components/RegisterForm/SignUp';
import styles from './page.module.css';

import React, { useState } from 'react';

export default function AuthPage() {
  return (
    <div className={styles.container}>
        <Login/>
    </div>
  );
}
