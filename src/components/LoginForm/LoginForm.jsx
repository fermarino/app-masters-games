import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';

const provider = new GoogleAuthProvider();

export default function Login({ onRegister }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user)
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider)
      console.log(user)
    } catch (error) {
      console.error(error)
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
