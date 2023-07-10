import React, { useState } from 'react';
import styles from './SignUp.module.css';

export default function Register({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica para realizar o registro
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Confirmars senha:', confirmPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2>Crie sua conta</h2>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">Email:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="password">Senha:</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="confirmPassword">Confirmar senha:</label>
        <input
          className={styles.input}
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.btn}>
        Criar conta
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles.btngoogle}`}
      >
        Registrar com o Google
      </button>
      <div className={styles.loginLink}>
        Não possui uma conta?{' '}
        <button type="button" onClick={onLogin}>
          Login
        </button>
      </div>
    </form>
  );
}
