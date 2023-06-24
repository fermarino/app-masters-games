'use client';

import styles from './page.module.css';

import GamesData from '@/components/GameData/GamesData';
import GamesList from '@/components/GamesList/GamesList';

const Home = () => {
  const { games, isLoading, error } = GamesData();

  if (isLoading) {
    return <div className={styles.loader}></div>
  }

  if (error) {
    return <span className={styles.customError}>{error}</span>;
  }

  if (games.length > 0) {
    return (
        <GamesList games={games} />
    );
  }

  return;
};

export default Home;
