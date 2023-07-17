
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

import styles from './RegisterForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Register({ onLogin }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (!email || !password ) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setFormError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('As senhas não coincidem.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Crie sua conta</h2>
      <div className={styles.formGroup}>
        <Input
          label='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.passwordField}>
          <Input
            label='Senha'
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.passwordButton} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {formError && <p className={styles.error}>{formError}</p>}
          <Input
            label='Confirmar senha'
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formError && (
            <p className={styles.error}>{formError}</p>
          )}
          <button className={styles.passwordButton} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
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
