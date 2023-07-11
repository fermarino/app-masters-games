import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import styles from './SignUp.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';

const provider = new GoogleAuthProvider();

export default function Register({ onLogin }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = async () => {
    if(!email || !password || !username) return;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
      await updateProfile(auth.currentUser, {
        displayName: username
      })
    } catch (error) {
      console.error(error)
    }
  };

  const signUpWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider)
    console.log(user)
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Crie sua conta</h2>
      <Button onClick={signUpWithGoogle}>
          Criar com o Google
      </Button>
      <div className={styles.formGroup}>
        <Input
          label='Nome'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          required='required'
        />
      <Input
          required='required'
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
      <Button
        type="submit"
        onClick={handleSignUp}>
        Criar conta
      </Button>
      <div className={styles.registerLink}>
        Já possui uma conta?{' '}
        <Link
          className={styles.createButton}
          href=''
          onClick={onLogin}
        >
          Entre na sua conta
        </Link>
      </div>
    </form>
  );
}
