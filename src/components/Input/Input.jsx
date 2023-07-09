import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, onChange, required }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        onChange={onChange}
        required={required}
      />
    </>
  )
}

export default Input