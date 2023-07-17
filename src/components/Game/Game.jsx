import styles from './Game.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes } from 'react-icons/fa';

import { useFavorites } from '@/hooks/useFavorites';
import { useRatings } from '@/hooks/useRatings';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Game = ({ game, user }) => {
  const [hoverRating, setHoverRating] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [clickedFavorite, setClickedFavorite] = useState(false)

  const { favoriteGames, addFavorite } = useFavorites();
  const { userRatings, gameRatings, addRating } = useRatings();

  const isFavorite = favoriteGames && favoriteGames.includes(game.id);
  const userRating = userRatings && userRatings[game.id];
  const gameRating = gameRatings && gameRatings[game.id];

  const router = useRouter();

  const handleFavorite = () => {
    if (user) {
      addFavorite(game.id);
      setClickedFavorite(true);
    } else {
      setModalMessage('Você deve entrar em sua conta para favoritar um jogo.');
      setModalButtonText('Entrar');
      setShowModal(true);
    }
  };

  const handleRating = (rating) => {
    if (user) {
      addRating(game.id, rating);
    } else {
      setModalMessage('Você deve entrar em sua conta para avaliar um jogo.');
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
    router.push('/auth');
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

  const openCardModal = () => {
    setIsCardOpen(true);
  };

  const closeCardModal = () => {
    setIsCardOpen(false);
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
            <span className={styles.ratingInfo}>0.0 (0)</span>
          )}
        </div>
        <button
          onClick={handleFavorite}
          className={`${styles.favoriteButton} ${isFavorite ? styles.clicked : ''} ${clickedFavorite ? styles.favoriteIcon : ''}`}
        >
          {isFavorite ? (
            <FaHeart className={`${styles.favoriteIcon} ${styles.favoriteFilled}`} />
          ) : (
            <FaRegHeart className={styles.favoriteOutline} />
          )}
        </button>
      </div>
      <p className={styles.gameDesc}>{game.short_description}</p>
      <button onClick={openCardModal} className={styles.viewDetailsButton}>
        Mais detalhes
      </button>
      {showModal && (
        <Modal
          message={modalMessage}
          buttonText={modalButtonText}
          onClose={closeModal}
          onButtonClick={redirectToAuth}
        />
      )}
      {isCardOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalCardContent}>
              <h2 className={styles.modalTitle}>{game.title}</h2>
              <h3 className={styles.modalGenre}>{game.genre}</h3>
              <Image
                src={game.thumbnail}
                alt={game.title}
                className={styles.gameImg}
                width={0}
                height={0}
                sizes="100vw"
              />
              <p className={styles.modalDesc}>{game.short_description}</p>
              <p className={styles.modalDesc}><span className={styles.infoSpan}>Data de Lançamento:</span> {game.release_date}</p>
              <p className={styles.modalDesc}><span className={styles.infoSpan}>Plataforma:</span> {game.platform}</p>
              <p className={styles.modalDesc}><span className={styles.infoSpan}>Empresa:</span> {game.developer}</p>
              <p className={styles.modalDesc}><span className={styles.infoSpan}>Editora: </span>{game.publisher}</p>
              <Link href={game.game_url}>
                <p className={styles.link}>Baixe agora</p>
              </Link>
              <button className={styles.closeButton} onClick={closeCardModal}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
