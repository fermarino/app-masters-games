import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';

export default function Register({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // lógica para realizar o registro
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Confirmars senha:', confirmPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2 className={styles.title}>Crie sua conta</h2>
      <Button>
          Criar com o Google
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
        <Input
          label='Confirmar senha'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required='required'
        />
      </div>
      <Button type="submit">
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
