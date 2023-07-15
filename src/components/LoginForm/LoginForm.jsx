'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';

const LoginForm = ({ onRegister, onForgotPassword }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginMessage('Por favor, preencha todos os campos.');
      return;
    };
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/')

    } catch (error) {
      setLoginMessage('Falha ao entrar na conta. Verifique seu email e senha.');
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onForgotPassword();
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Entre na sua conta</h2>
      <div className={styles.formGroup}>
        <Input
          label='Email'
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.passwordField}>
          <Input
            className={styles.passwordInput}
            label='Senha'
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.passwordButton} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      {loginMessage && <p className={styles.loginError}>{loginMessage}</p>}
      <div className={styles.forgotLink}>
        <Link href="#" onClick={handleForgotPassword}>
          Esqueceu sua senha?
        </Link>
      </div>
      <Button type="submit" onClick={handleLogin} >
        Entrar
      </Button>
      <div className={styles.registerLink}>
        Não possui uma conta?{' '}
        <Link
          className={styles.createButton}
          href=''
          onClick={onRegister}
        >
          Criar conta
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;