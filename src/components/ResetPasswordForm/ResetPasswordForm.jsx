import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import styles from './ResetPasswordForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';

const ResetPasswordForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setResetError('Por favor, digite seu email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (error) {
      setResetError('Falha ao enviar o email de redefinição de senha. Verifique seu email.');
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Redefinir senha</h2>
      {!resetSuccess ? (
        <>
          <div className={styles.formGroup}>
            <Input label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {resetError && <p className={styles.resetError}>{resetError}</p>}
          <Button type="submit" onClick={handleResetPassword}>
            Redefinir senha
          </Button>
          <div className={styles.loginLink}>
            <Link href="#" onClick={onLogin}>
              Voltar para o login
            </Link>
          </div>
        </>
      ) : (
        <p className={styles.resetSuccess}>
          Um email para redefinir sua senha foi enviado para o seu endereço de email.
        </p>
      )}
    </form>
  );
};

export default ResetPasswordForm;