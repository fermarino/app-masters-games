'use client';

import styles from './page.module.css';

import GamesData from '@/services/GamesData';
import GamesList from '@/components/GamesList/GamesList';

const Home = () => {
  const { games, isLoading, error } = GamesData();
  const hasGames = games.length > 0;

  if (isLoading) {
    return <div className={styles.loader}/>
  }

  if (error) {
    return <span className={styles.customError}>{error}</span>;
  }

  if (!isLoading && hasGames) {
    return (
        <GamesList games={games} />
    );
  }

  return null;
};

export default Home;
