import React from 'react';
import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

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
      <Button
        onClick=''
      >Entrar</Button>
    </form>
  )
}

export default LoginForm