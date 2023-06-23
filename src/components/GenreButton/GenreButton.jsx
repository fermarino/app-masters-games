import React from 'react';
import styles from '@/components/GenreButton/GenreButton.module.css';

const GenreButton = ({ genre, isActive, onClick, allGenres }) => {
  const handleClick = () => {
    onClick(genre);
  };

  return (
    <button
      className={`${isActive ? styles.active : styles.button} ${
        allGenres ? styles.allGenres : ''
      }`}
      onClick={handleClick}
    >
      {allGenres ? 'All' : genre}
    </button>
  );
};

export default GenreButton;
