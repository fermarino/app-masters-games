import styles from './Game.module.css'
import Image from 'next/image'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Game = ({ title, genre, thumbnail, short_description, isFavorite, onFavorite }) => {
  return (
    <div className={styles.cardGame}>
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{title}</h2>
        <h3 className={styles.gameGenre}>{genre}</h3>
        {isFavorite ? (
          <button className={styles.favoriteButton} onClick={onFavorite}>
            <FaHeart color="red" />
          </button>
        ) : (
          <button className={styles.favoriteButton} onClick={onFavorite}>
            <FaRegHeart />
          </button>
        )}
      </div>
      <Image src={thumbnail} alt={title} className={styles.gameImg}
        width={0}
        height={0}
        sizes="100vw" />
      <p className={styles.gameDesc}>{short_description}</p>
      
    </div>
  )
}

export default Game