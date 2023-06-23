import React from 'react';
import styles from '@/components/GenreButton/GenreButton.module.css';
import Link from 'next/link';

const GenreButton = ({ genre, isActive, onClick, allGenres }) => {
  const handleClick = () => {
    onClick(genre);
  };

  return (
    <li
      className={`${isActive ? styles.active : styles.button} ${
        allGenres ? styles.allGenres : ''
      }`}
      onClick={handleClick}
    >
      <Link href={'#'} className={styles.genreButton}>{genre}</Link>
    </li>
  );
};

export default GenreButton;
