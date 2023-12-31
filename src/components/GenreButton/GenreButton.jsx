import styles from './GenreButton.module.css';
import Link from 'next/link';

const GenreButton = ({ genre, onClick }) => {
  const handleClick = () => {
    onClick(genre);
  };

  return (
    <li
      onClick={handleClick}
    >
      <Link href={'#'} className={styles.genreButton}>{genre}</Link>
    </li>
  );
};

export default GenreButton;
