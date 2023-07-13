import styles from './Game.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';


const Game = ({ title, genre, thumbnail, short_description, isFavorite, onFavorite, user, userRating, onRating }) => {
  const [isFavoriteGame, setIsFavoriteGame] = useState(isFavorite);
  const [rating, setRating] = useState(userRating || 0);


  useEffect(() => {
    setIsFavoriteGame(isFavorite);
    setRating(userRating || 0);
  }, [isFavorite, userRating]);

  const handleFavorite = () => {
    if (!user) {
      alert('Faça login para favoritar um jogo!');
      return;
    }

    onFavorite();
    setIsFavoriteGame((prevIsFavorite) => !prevIsFavorite);
  };

  const handleRate = (newRating) => {
    if (!user) {
      alert('Faça login para avaliar um jogo!');
      return;
    }

    onRating(newRating);
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <FaStar
          key={i}
          className={rating >= i ? styles.starFilled : styles.starOutline}
          onClick={() => handleRate(i)}
        />
      );
    }

    return stars;
  };

  return (
    <div className={styles.cardGame} >
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{title}</h2>
        <h3 className={styles.gameGenre}>{genre}</h3>
      </div>
      <button onClick={handleFavorite} className={styles.favoriteButton}>
        {isFavoriteGame ? (
          <FaHeart className={`${styles.favoriteIcon} ${styles.favoriteFilled}`} />
        ) : (
          <FaRegHeart className={styles.favoriteOutline} />
        )}
      </button>

      <div className={styles.ratingContainer}>
        {renderStars()}
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