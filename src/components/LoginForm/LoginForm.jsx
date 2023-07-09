import React from 'react';
import styles from './LoginForm.module.css';
import Input from '../Input/Input';

const LoginForm = () => {
  return (
    <form className={styles.loginForm}>
      <h2 className={styles.formTitle}>Entre na sua conta</h2>
      <Input
        label='E-mail'
        type='text'
        onChange=''
        required='required'
      />
      <Input
        label='Senha'
        type='password'
        onChange=''
        required='required'
      />
      <button className={styles.loginButton} type='submit'>Entrar</button>
    </form>
  )
}

export default LoginForm