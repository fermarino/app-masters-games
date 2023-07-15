import styles from './Game.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

import { useFavorites } from '@/hooks/useFavorites';
import { useRatings } from '@/hooks/useRatings';



const Game = ({ game }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const { favoriteGames, addFavorite } = useFavorites();
  const { userRatings, addRating } = useRatings();

  const isFavorite = favoriteGames && favoriteGames.includes(game.id);
  const userRating = userRatings && userRatings[game.id];


  const handleFavorite = () => {
    addFavorite(game.id);
  };

  const handleRating = (rating) => {
    addRating(game.id, rating);
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 4;

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= hoverRating ||i <= userRating ? styles.starFilled : styles.starOutline}
          onClick={() => handleRating(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    }

    return stars;
  };

  return (
    <div className={styles.cardGame} >
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{game.title}</h2>
        <h3 className={styles.gameGenre}>{game.genre}</h3>
      </div>
      <button onClick={handleFavorite} className={styles.favoriteButton}>
        {isFavorite ? (
          <FaHeart className={`${styles.favoriteIcon} ${styles.favoriteFilled}`} />
        ) : (
          <FaRegHeart className={styles.favoriteOutline} />
        )}
      </button>

      <div className={styles.ratingContainer}>
        {renderStars()}
      </div>

      <Image src={game.thumbnail} alt={game.title} className={styles.gameImg}
        width={0}
        height={0}
        sizes="100vw" />
      <p className={styles.gameDesc}>{game.short_description}</p>

    </div>
  )
}

export default Game