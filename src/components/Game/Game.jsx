import styles from './Game.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Game = ({ title, genre, thumbnail, short_description, isFavorite, onFavorite, user }) => {
  const [isFavoriteGame, setIsFavoriteGame] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteGame(isFavorite);
  }, [isFavorite]);

  const handleFavorite = () => {
    if (!user) {
      alert('Faça login para favoritar um jogo!');
      return;
    }

    onFavorite();
    setIsFavoriteGame(!isFavoriteGame);
  };

  return (
    <div className={styles.cardGame} >
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{title}</h2>
        <h3 className={styles.gameGenre}>{genre}</h3>
        <button onClick={handleFavorite} className={styles.favoriteButton}>
          {isFavoriteGame ? (
            <FaHeart className={styles.favoriteFilled} />
          ) : (
            <FaRegHeart className={styles.favoriteOutline} />
          )}
        </button>
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