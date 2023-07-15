import React from 'react';
import styles from './Modal.module.css';
import { FaTimes  } from 'react-icons/fa'

const Modal = ({ message, buttonText, onClose, onButtonClick }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes/>
        </button>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
