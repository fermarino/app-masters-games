'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';

const provider = new GoogleAuthProvider();

const LoginForm = ({ onRegister }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/')
      
    } catch (error) {
      setLoginError('Falha ao entrar na conta. Verifique seu email e senha.');
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/')
    } catch (error) {
      setLoginError('Falha ao fazer login com o Google.');
    }
  }
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Entre na sua conta</h2>
      <Button onClick={signInWithGoogle}>
        Entrar com o Google
      </Button>
      <div className={styles.formGroup}>
        <Input
          label='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label='Senha'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required='required'
        />
      </div>
      {loginError && <p>{loginError}</p>}
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