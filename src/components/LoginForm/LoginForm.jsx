import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';

export default function Login({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // lógica para realizar o login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h2 className={styles.title}>Entre na sua conta</h2>
        <Button>
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
      <Button type="submit">
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
