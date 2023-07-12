
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import styles from './RegisterForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';


export default function Register({ onLogin }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !username) return;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
      await updateProfile(auth.currentUser, {
        displayName: username
      })
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Crie sua conta</h2>
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
