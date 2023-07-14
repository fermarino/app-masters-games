'use client';

import styles from './page.module.css';

import GamesData from '@/services/GamesData';
import GamesList from '@/components/GamesList/GamesList';

import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useRatings } from '@/hooks/useRatings';

const Home = () => {
  const { favoriteGames } = useFavorites();
  const { userRatings, addRating } = useRatings();

  const { user, isLoading: isAuthLoading } = useAuth();
  const { games, isLoading, error } = GamesData();
  const hasGames = games.length > 0;

  const handleRating = (gameId, ratingValue) => {
    addRating(gameId, ratingValue);
  };

  if (isLoading) {
    return <div className={styles.loader} />;
  }

  if (error) {
    return <span className={styles.customError}>{error}</span>;
  }

  return (
    <GamesList
      games={games}
      favoriteGames={favoriteGames}
      userRatings={userRatings}
      onRating={handleRating}
      user={user}
    />
  );
};

export default Home;
