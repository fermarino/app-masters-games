import React from 'react'
import styles from './SignUp.module.css'

import Input from '../Input/Input'
import Button from '../Button/Button'

const SignUp = ({  }) => {
  return (
    <form className={styles.registerForm}>
      <h2 className={styles.formTitle}>Crie sua conta</h2>
      
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
      <Input
        label='Confirmar senha'
        type='password'
        onChange=''
        required='required'
      />
      <Button
        onClick=''
      >Criar conta</Button>
    </form>
  )
}

export default SignUp