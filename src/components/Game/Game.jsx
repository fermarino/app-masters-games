import styles from './Game.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

import { useFavorites } from '@/hooks/useFavorites';
import { useRatings } from '@/hooks/useRatings';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

const Game = ({ game, user }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const { favoriteGames, addFavorite } = useFavorites();
  const { userRatings, gameRatings, addRating } = useRatings();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');

  const isFavorite = favoriteGames && favoriteGames.includes(game.id);
  const userRating = userRatings && userRatings[game.id];
  const gameRating = gameRatings && gameRatings[game.id];

  const router = useRouter()

  const handleFavorite = () => {
    if (user) {
      addFavorite(game.id);
    } else {
      setModalMessage('Você deve entrar em sua conta para favoritar um jogo');
      setModalButtonText('Entrar');
      setShowModal(true);
    }
  };

  const handleRating = (rating) => {
    if (user) {
      addRating(game.id, rating);
    } else {
      setModalMessage('Você deve entrar em sua conta para avaliar o jogo');
      setModalButtonText('Entrar');
      setShowModal(true);
    }
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirectToAuth = () => {
    router.push('/auth')
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 4;

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= hoverRating || i <= userRating ? styles.starFilled : styles.starOutline}
          onClick={() => handleRating(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    }

    return stars;
  };

  return (
    <div className={styles.cardGame}>
      <div className={styles.gameInfo}>
        <h2 className={styles.gameTitle}>{game.title}</h2>
        <h3 className={styles.gameGenre}>{game.genre}</h3>
      </div>
      <Image
        src={game.thumbnail}
        alt={game.title}
        className={styles.gameImg}
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className={styles.userFeatures}>
        <div className={styles.ratingContainer}>
          {renderStars()}
          {gameRating ? (
            <span className={styles.ratingInfo}>
              {gameRating.average.toFixed(1)} ({gameRating.count})
            </span>
          ) : (
            <span className={styles.ratingInfo}>
              0.0 (0)
            </span>
          )}
        </div>
        <button onClick={handleFavorite} className={styles.favoriteButton}>
          {isFavorite ? (
            <FaHeart className={`${styles.favoriteIcon} ${styles.favoriteFilled}`} />
          ) : (
            <FaRegHeart className={styles.favoriteOutline} />
          )}
        </button>
      </div>
      <p className={styles.gameDesc}>{game.short_description}</p>
      {showModal && (
        <Modal
          message={modalMessage}
          buttonText={modalButtonText}
          onClose={closeModal}
          onButtonClick={redirectToAuth}
        />
      )}
    </div>
  );
};

export default Game;
